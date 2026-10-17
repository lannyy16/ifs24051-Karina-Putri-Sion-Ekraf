import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

import { getServerSession } from "@/lib/server/auth";
import { getProducts } from "@/lib/server/products";
import { getUsers } from "@/lib/server/users";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		const { session } = await getServerSession();
		if (!session) {
			return redirect({ to: "/login" }) as any;
		}
	},
	component: Dashboard,
});

function Dashboard() {
	const productsQuery = useQuery({
		queryKey: ["dashboard", "products"],
		queryFn: async () => getProducts(),
	});
	const usersQuery = useQuery({
		queryKey: ["dashboard", "users"],
		queryFn: async () => getUsers(),
	});

	const products = productsQuery.data ?? [];
	const users = usersQuery.data ?? [];
	const adminCount = users.filter((u) => u.role === "admin").length;

	return (
		<main className="page-wrap px-4 py-12">
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
					<div>
						<p className="island-kicker mb-2">RUANG KERJA EKRAF TOBA</p>
						<h1 className="display-title mb-1 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
							Dashboard kamu
						</h1>
						<p className="m-0 text-[var(--sea-ink-soft)]">
							Pantau produk, komunitas, dan kelola ruang kreatifmu dari satu tempat.
						</p>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-3">
					<StatCard title="Produk kreatif" value={products.length} />
					<StatCard title="Pengguna" value={users.length} />
					<StatCard title="Administrator" value={adminCount} />
				</div>

				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					<Card title="Produk kreatif" subtitle="Kelola karya dan produk kreatif yang ditampilkan.">
						<Link
							to="/products"
							className="text-[var(--sea-ink)] font-medium underline underline-offset-4 hover:text-[var(--sea-ink)]"
						>
							Kelola katalog →
						</Link>
					</Card>
					<Card title="Pengguna" subtitle="Lihat akun pengguna dan peran yang terdaftar.">
						<Link
							to="/users"
							className="text-[var(--sea-ink)] font-medium underline underline-offset-4 hover:text-[var(--sea-ink)]"
						>
							Kelola pengguna →
						</Link>
					</Card>
				</div>

				{productsQuery.isError && (
					<p className="mt-4 text-sm text-red-600">
						Produk gagal dimuat: {(productsQuery.error as Error).message}
					</p>
				)}
				{usersQuery.isError && (
					<p className="mt-4 text-sm text-red-600">
						Data pengguna gagal dimuat: {(usersQuery.error as Error).message}
					</p>
				)}
			</section>
		</main>
	);
}

function StatCard({ title, value }: { title: string; value: number }) {
	return (
		<div className="rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] p-5">
			<p className="m-0 text-sm text-[var(--sea-ink-soft)]">{title}</p>
			<p className="m-0 mt-1 text-3xl font-bold text-[var(--sea-ink)]">{value}</p>
		</div>
	);
}

function Card({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] p-5">
			<p className="m-0 text-sm text-[var(--sea-ink-soft)]">{title}</p>
			<p className="m-0 mt-1 text-xs text-[var(--sea-ink-soft)]">{subtitle}</p>
			<div className="mt-4">{children}</div>
		</div>
	);
}
