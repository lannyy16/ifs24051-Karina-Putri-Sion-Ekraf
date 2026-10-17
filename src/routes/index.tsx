import { Link, createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Compass,
	Leaf,
	ShoppingBag,
	Sparkles,
	Store,
	Users,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const highlights = [
	{
		icon: Store,
		title: "Produk lokal",
		text: "Temukan karya pilihan dari UMKM dan kreator lokal.",
	},
	{
		icon: Compass,
		title: "Jelajah kawasan",
		text: "Kenali tempat, budaya, dan pengalaman khas Danau Toba.",
	},
	{
		icon: Users,
		title: "Komunitas kreatif",
		text: "Hubungkan ide, pelaku usaha, dan peluang kolaborasi.",
	},
];

const categories = [
	{
		title: "Kriya & wastra",
		subtitle: "Ulos, kerajinan, dan karya tangan",
		image: "photo-1604881988758-f76ad2f7aac1",
	},
	{
		title: "Kuliner lokal",
		subtitle: "Rasa khas dari tanah Batak",
		image: "photo-1547592180-85f173990554",
	},
	{
		title: "Seni & budaya",
		subtitle: "Cerita dan tradisi yang hidup",
		image: "photo-1513364776144-60967b0f800f",
	},
];

function Home() {
	return (
		<main className="ekraf-home">
			<section className="hero-wrap">
				<div className="hero-copy">
					<div className="eyebrow">
						<span className="eyebrow-dot" /> RUANG TUMBUH KREATIVITAS LOKAL
					</div>
					<h1>
						Merayakan kreativitas,
						<br />
						<em>menghidupkan</em> Danau Toba.
					</h1>
					<p className="hero-description">
						Temukan cerita, produk, dan potensi luar biasa dari para pelaku ekonomi kreatif di
						kawasan Danau Toba. Satu ruang untuk karya lokal bertemu peluang baru.
					</p>
					<div className="hero-actions">
						<Link to="/register" className="button-primary">
							Mulai jelajahi <ArrowRight size={17} />
						</Link>
						<a href="#tentang" className="button-text">
							Kenali platform <ArrowUpRight size={16} />
						</a>
					</div>
					<div className="hero-proof">
						<div className="avatar-stack">
							<span>K</span>
							<span>T</span>
							<span>D</span>
							<span>+</span>
						</div>
						<p>
							<strong>Berangkat dari potensi lokal</strong>
							<br />
							bertumbuh bersama komunitas
						</p>
					</div>
				</div>
				<div className="hero-visual">
					<img
						src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1100&q=85"
						alt="Pemandangan danau dan perbukitan hijau"
					/>
					<div className="image-shade" />
					<div className="visual-label">
						<span className="visual-label-icon">
							<Leaf size={17} />
						</span>
						<div>
							<strong>Local roots, wider reach</strong>
							<small>Potensi lokal untuk masa depan</small>
						</div>
					</div>
					<div className="floating-note">
						<Sparkles size={16} />
						<span>Temukan yang autentik</span>
					</div>
				</div>
				<div className="hero-orbit orbit-one" />
				<div className="hero-orbit orbit-two" />
			</section>

			<section className="intro-strip" id="tentang">
				<div>
					<p className="section-label">TENTANG EKRAF TOBA</p>
					<h2>Lebih dari sekadar tempat berjualan.</h2>
				</div>
				<p>
					Ekraf Toba mempertemukan produk kreatif, identitas budaya, dan orang-orang yang ingin
					mendukung ekonomi lokal. Mulai dari menemukan karya hingga membangun koneksi.
				</p>
			</section>

			<section className="benefit-grid">
				{highlights.map(({ icon: Icon, title, text }, index) => (
					<article className="benefit-card" key={title}>
						<div className="benefit-top">
							<span className="benefit-icon">
								<Icon size={21} />
							</span>
							<span className="card-number">0{index + 1}</span>
						</div>
						<h3>{title}</h3>
						<p>{text}</p>
					</article>
				))}
			</section>

			<section className="category-section">
				<div className="section-heading">
					<div>
						<p className="section-label">JELAJAHI POTENSI</p>
						<h2>Setiap karya punya cerita.</h2>
					</div>
					<Link to="/products" className="button-outline">
						Lihat produk <ArrowRight size={16} />
					</Link>
				</div>
				<div className="category-grid">
					{categories.map((item) => (
						<article className="category-card" key={item.title}>
							<img
								src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=80`}
								alt={item.title}
							/>
							<div className="category-overlay">
								<span>EKONOMI KREATIF</span>
								<h3>{item.title}</h3>
								<p>{item.subtitle}</p>
							</div>
							<ArrowUpRight className="category-arrow" size={20} />
						</article>
					))}
				</div>
			</section>

			<section className="join-banner">
				<div className="join-icon">
					<ShoppingBag size={23} />
				</div>
				<div>
					<p className="section-label">PUNYA KARYA UNTUK DIBAGIKAN?</p>
					<h2>Biarkan lebih banyak orang mengenal karyamu.</h2>
					<p>Buat akun dan mulai bangun kehadiran digital untuk usaha kreatifmu.</p>
				</div>
				<Link to="/register" className="button-light">
					Gabung sekarang <ArrowRight size={17} />
				</Link>
			</section>
			<footer className="ekraf-footer">
				<Link to="/" className="brand-lockup">
					<span className="brand-mark">e.</span>
					<span>
						ekraf<span className="brand-toba">toba</span>
					</span>
				</Link>
				<p>Ruang digital untuk kreativitas lokal Danau Toba.</p>
				<span>© 2026 Ekraf Toba</span>
			</footer>
		</main>
	);
}
