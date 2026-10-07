import { auth } from "@/auth";
import Link from "next/link";
import { Music, ArrowRight, ShieldCheck, Ticket, User } from "lucide-react";

export const instant = false;

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  let dashboardHref = "/login";
  let dashboardLabel = "Masuk dengan NIS";

  if (user) {
    if (user.role === "ADMIN") {
      dashboardHref = "/admin";
      dashboardLabel = "Buka Dashboard Admin";
    } else if (user.role === "PETUGAS") {
      dashboardHref = "/petugas";
      dashboardLabel = "Buka Portal Petugas";
    } else {
      dashboardHref = "/siswa";
      dashboardLabel = "Buka Dashboard Siswa";
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Decorative lighting effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute -top-10 right-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px]" />
      </div>

      {/* Navigation Bar */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Music className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-base tracking-tight">
            Konser Puncak Angkatan
          </span>
        </div>

        <Link
          href={dashboardHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white transition shadow"
        >
          {user ? (
            <>
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>{user.name} ({user.role})</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Masuk Sistem</span>
            </>
          )}
        </Link>
      </header>

      {/* Hero Content */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
          <Ticket className="w-3.5 h-3.5 text-indigo-400" />
          <span>Sistem Ticketing & Manajemen Acara</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
          Konser Puncak Angkatan
        </h1>

        <p className="text-lg sm:text-2xl font-light text-indigo-200/90 mb-3 tracking-wide">
          Segera hadir
        </p>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
          Pengalaman konser spektakuler penutup masa sekolah. Sistem reservasi tiket,
          verifikasi pembayaran, dan scan QR code digital khusus angkatan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={dashboardHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 group"
          >
            <span>{dashboardLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500 py-6 border-t border-slate-900">
        &copy; 2026 Konser Puncak Angkatan. Hak Cipta Dilindungi.
      </footer>
    </main>
  );
}
