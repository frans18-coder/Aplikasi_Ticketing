import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { Music, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Login — Konser Puncak Angkatan",
  description: "Masuk ke sistem ticketing Konser Puncak Angkatan menggunakan NIS.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative selection:bg-indigo-500 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 flex items-center justify-between max-w-6xl mx-auto w-full py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Music className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-sm hidden sm:inline">
            Konser Puncak Angkatan
          </span>
        </div>
      </header>

      {/* Center Form */}
      <div className="relative z-10 flex items-center justify-center py-8">
        <LoginForm />
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500 py-4">
        &copy; 2026 Konser Puncak Angkatan. Hak Cipta Dilindungi.
      </footer>
    </main>
  );
}
