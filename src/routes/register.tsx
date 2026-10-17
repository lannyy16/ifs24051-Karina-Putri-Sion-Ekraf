import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Leaf, LockKeyhole, Mail, UserRound } from "lucide-react";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const result = await authClient.signUp.email({ name, email, password });
      if (result.error) setError(result.error.message || "Pendaftaran belum berhasil. Silakan coba lagi.");
      else await navigate({ to: "/dashboard" });
    } catch { setError("Belum berhasil membuat akun. Periksa koneksi lalu coba lagi."); }
    finally { setLoading(false); }
  }
  return <main className="auth-page"><Link to="/" className="auth-back"><ArrowLeft size={16} /> Kembali ke beranda</Link><div className="auth-layout"><section className="auth-story"><div className="auth-story-image" /><div className="auth-story-content"><div className="auth-brand"><span className="brand-mark">e.</span> ekraftoba</div><p className="section-label">MULAI PERJALANANMU</p><h1>Ide baik tumbuh<br /><em>bersama komunitas.</em></h1><p>Bangun koneksi, tampilkan karya, dan ikut membawa cerita kreatif Danau Toba lebih jauh.</p><div className="auth-story-foot"><Leaf size={16} /> Satu akun, banyak kemungkinan.</div></div></section><section className="auth-form-side"><div className="auth-form-wrap"><div className="auth-mobile-brand"><span className="brand-mark">e.</span> ekraftoba</div><p className="section-label">GABUNG KOMUNITAS</p><h2>Buat akun barumu.</h2><p className="auth-subtitle">Mulai kenalkan karya dan ide kreatifmu.</p><form onSubmit={handleSubmit} className="auth-form"><label htmlFor="name">Nama lengkap</label><div className="auth-input-wrap"><UserRound size={18} /><input id="name" type="text" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required minLength={2} /></div><label htmlFor="email">Alamat email</label><div className="auth-input-wrap"><Mail size={18} /><input id="email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></div><label htmlFor="password">Buat kata sandi</label><div className="auth-input-wrap"><LockKeyhole size={18} /><input id="password" type={showPassword ? "text" : "password"} placeholder="Minimal 8 karakter" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required minLength={8} /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{error && <p className="auth-error" role="alert">{error}</p>}<button className="auth-submit" type="submit" disabled={loading}>{loading ? "Membuat akun..." : "Buat akun gratis"}<span>→</span></button></form><p className="auth-switch">Sudah punya akun? <Link to="/login">Masuk di sini</Link></p><p className="auth-terms">Daftar hanya membutuhkan beberapa langkah. Jaga informasi akunmu tetap aman.</p></div></section></div></main>;
}
