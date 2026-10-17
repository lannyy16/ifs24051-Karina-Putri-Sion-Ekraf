import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { db, getUserRole, removeUserRole, setUserRole } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

const userIdSchema = z.string().trim().min(1).max(128);
export const userRoleSchema = z.object({
	userId: userIdSchema,
	role: z.enum(["admin", "user"]),
});

function httpError(message: string, status: number): Error & { status: number } {
	return Object.assign(new Error(message), { status });
}

export const getUsers = createServerFn({ method: "GET" }).handler(async () => {
	await requireAdmin();
	return db.user.map((u) => ({
		id: u.id,
		email: u.email,
		name: u.name,
		role: getUserRole(u.id),
		emailVerified: Boolean(u.emailVerified),
		createdAt: u.createdAt.toISOString(),
	}));
});

export const updateUserRole = createServerFn({ method: "POST" })
	.validator(userRoleSchema)
	.handler(async ({ data }) => {
		const { user: actor } = await requireAdmin();
		const target = db.user.find((u) => u.id === data.userId);
		if (!target) throw httpError("User not found", 404);
		const oldRole = getUserRole(data.userId);
		if (actor.id === data.userId && data.role !== "admin") {
			throw httpError("You cannot remove your own administrator role.", 400);
		}
		if (oldRole === "admin" && data.role !== "admin") {
			const adminCount = db.user.filter((u) => getUserRole(u.id) === "admin").length;
			if (adminCount <= 1) throw httpError("Cannot demote the last administrator.", 400);
		}
		setUserRole(data.userId, data.role);
		return { ok: true };
	});

export const deleteUser = createServerFn({ method: "POST" })
	.validator(z.object({ userId: userIdSchema }))
	.handler(async ({ data }) => {
		const { user: actor } = await requireAdmin();
		if (actor.id === data.userId) throw httpError("You cannot delete your own account here.", 400);
		const target = db.user.find((u) => u.id === data.userId);
		if (!target) throw httpError("User not found", 404);
		if (getUserRole(data.userId) === "admin") {
			const adminCount = db.user.filter((u) => getUserRole(u.id) === "admin").length;
			if (adminCount <= 1) throw httpError("Cannot delete the last administrator.", 400);
		}
		db.user = db.user.filter((u) => u.id !== data.userId);
		removeUserRole(data.userId);
		// Remove any in-memory sessions/accounts belonging to this user where records expose userId.
		db.session = db.session.filter((item) => (item as { userId?: string }).userId !== data.userId);
		db.account = db.account.filter((item) => (item as { userId?: string }).userId !== data.userId);
		return { ok: true };
	});
