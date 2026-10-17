import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRequestHeaders } from "@tanstack/react-start/server";

/**
 * Mengambil session saat ini dengan meneruskan headers (cookie) dari browser.
 */
export async function getCurrentSession() {
  // 1. Ambil headers (berisi cookie session) dari request yang masuk
  const headers = getRequestHeaders();
  
  // 2. Teruskan ke Better Auth
  const session = await auth.api.getSession({ headers });
  
  return session;
}

/**
 * Memastikan user sudah login (Task C)
 */
export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized: login required");
  }
  return session;
}

/**
 * Memastikan user adalah admin (Task C)
 */
export async function requireAdmin() {
  // 1. Cek login dulu
  const session = await requireAuth();
  
  // 2. Cek role di in-memory database
  // (Menyesuaikan dengan struktur db di file seedAdmin yang kamu tunjukkan sebelumnya)
  const userRole = db.userRole.find((r) => r.userId === session.user.id)?.role;

  if (userRole !== "admin") {
    throw new Error("Forbidden: admin required");
  }
  
  return session;
}