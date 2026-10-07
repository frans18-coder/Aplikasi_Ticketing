"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Lock, User, Eye, EyeOff, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function LoginForm() {
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nis.trim() || !password) {
      setError("NIS dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        nis: nis.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("NIS atau password tidak sesuai. Pastikan akun sudah terdaftar.");
        setLoading(false);
      } else {
        // Berhasil login, refresh ke /login yang otomatis diredirect middleware ke dashboard role
        window.location.href = "/login";
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoNis: string, demoPass: string) => {
    setNis(demoNis);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sistem Tiket Digital</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Selamat Datang
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Masuk dengan NIS dan password yang telah diberikan
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-snug">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Nomor Induk Siswa (NIS)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={nis}
              onChange={(e) => setNis(e.target.value)}
              placeholder="Contoh: 1021001 atau ADMIN001"
              required
              autoComplete="username"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memverifikasi...</span>
            </>
          ) : (
            <span>Masuk ke Akun</span>
          )}
        </button>
      </form>

      {/* Quick Demo Credentials */}
      <div className="mt-6 pt-5 border-t border-slate-800/80">
        <p className="text-xs font-medium text-slate-400 mb-2.5 text-center">
          ⚡ Akun Contoh Pengujian (Klik untuk isi cepat):
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => fillDemoAccount("1021001", "Siswa@12345")}
            className="px-2.5 py-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left transition group cursor-pointer"
          >
            <div className="text-[11px] font-semibold text-emerald-400 group-hover:text-emerald-300">
              Siswa
            </div>
            <div className="text-[10px] text-slate-400 truncate">1021001</div>
          </button>

          <button
            type="button"
            onClick={() => fillDemoAccount("PETUGAS001", "Petugas@12345")}
            className="px-2.5 py-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left transition group cursor-pointer"
          >
            <div className="text-[11px] font-semibold text-amber-400 group-hover:text-amber-300">
              Petugas
            </div>
            <div className="text-[10px] text-slate-400 truncate">PETUGAS001</div>
          </button>

          <button
            type="button"
            onClick={() => fillDemoAccount("ADMIN001", "Admin@12345")}
            className="px-2.5 py-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left transition group cursor-pointer"
          >
            <div className="text-[11px] font-semibold text-purple-400 group-hover:text-purple-300">
              Admin
            </div>
            <div className="text-[10px] text-slate-400 truncate">ADMIN001</div>
          </button>
        </div>
      </div>
    </div>
  );
}
