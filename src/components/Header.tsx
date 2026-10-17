import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import BetterAuthHeader from "../integrations/better-auth/header-user.tsx";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-xl">
			<nav className="page-wrap flex flex-wrap items-center gap-5 py-3 sm:py-4">
				<Link to="/" className="brand-lockup">
					<span className="brand-mark">e.</span>
					<span>
						ekraf<span className="brand-toba">toba</span>
						<small className="block text-[9px] font-medium tracking-[.12em] text-[var(--sea-ink-soft)]">
							KREATIVITAS DANAU TOBA
						</small>
					</span>
				</Link>
				<div className="ml-auto hidden items-center gap-6 text-sm font-semibold md:flex">
					<Link to="/" className="nav-link">
						Beranda
					</Link>
					<a href="/#tentang" className="nav-link">
						Tentang
					</a>
					<Link to="/products" className="nav-link">
						Jelajahi produk
					</Link>
					<Link to="/dashboard" className="nav-link">
						Dashboard
					</Link>
				</div>
				<div className="ml-auto flex items-center gap-2 md:ml-2">
					<Link
						to="/login"
						className="hidden rounded-lg px-3 py-2 text-sm font-bold text-[var(--sea-ink)] no-underline sm:inline-flex"
					>
						Masuk
					</Link>
					<Link
						to="/register"
						className="inline-flex items-center gap-2 rounded-lg bg-[#28543b] px-4 py-2.5 text-sm font-bold text-white no-underline hover:bg-[#1e432f]"
					>
						Gabung <ArrowUpRight size={15} />
					</Link>
					<BetterAuthHeader />
					<ThemeToggle />
				</div>
				<div className="flex w-full items-center gap-4 overflow-x-auto pb-1 text-sm font-semibold md:hidden">
					<Link to="/" className="nav-link">
						Beranda
					</Link>
					<a href="/#tentang" className="nav-link">
						Tentang
					</a>
					<Link to="/products" className="nav-link">
						Produk
					</Link>
					<Link to="/dashboard" className="nav-link">
						Dashboard
					</Link>
				</div>
			</nav>
		</header>
	);
}
