import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Leaf, LockKeyhole, Mail } from "lucide-react";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) setError(result.error.message || "Email atau kata sandi belum sesuai.");
      else await navigate({ to: "/dashboard" });
    } catch { setError("Belum berhasil masuk. Periksa koneksi lalu coba lagi."); }
    finally { setLoading(false); }
  }

  return <main className="auth-page"><Link to="/" className="auth-back"><ArrowLeft size={16} /> Kembali ke beranda</Link><div className="auth-layout"><section className="auth-story"><div className="auth-story-image" /><div className="auth-story-content"><div className="auth-brand"><span className="brand-mark">e.</span> ekraftoba</div><p className="section-label">SELAMAT DATANG KEMBALI</p><h1>Karya lokal,<br /><em>peluang tanpa batas.</em></h1><p>Masuk kembali dan lanjutkan perjalanan kreatifmu bersama komunitas Danau Toba.</p><div className="auth-story-foot"><Leaf size={16} /> Tumbuh dari lokal, berdampak lebih luas.</div></div></section><section className="auth-form-side"><div className="auth-form-wrap"><div className="auth-mobile-brand"><span className="brand-mark">e.</span> ekraftoba</div><p className="section-label">AKUN EKRAF TOBA</p><h2>Senang melihatmu lagi.</h2><p className="auth-subtitle">Masuk untuk mengakses ruang kreatifmu.</p><form onSubmit={handleSubmit} className="auth-form"><label htmlFor="email">Alamat email</label><div className="auth-input-wrap"><Mail size={18} /><input id="email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></div><div className="auth-label-row"><label htmlFor="password">Kata sandi</label></div><div className="auth-input-wrap"><LockKeyhole size={18} /><input id="password" type={showPassword ? "text" : "password"} placeholder="Masukkan kata sandi" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{error && <p className="auth-error" role="alert">{error}</p>}<button className="auth-submit" type="submit" disabled={loading}>{loading ? "Sedang masuk..." : "Masuk ke akun"}<span>→</span></button></form><p className="auth-switch">Belum punya akun? <Link to="/register">Daftar gratis</Link></p><p className="auth-terms">Dengan masuk, kamu setuju menggunakan platform secara bertanggung jawab.</p></div></section></div></main>;
}
