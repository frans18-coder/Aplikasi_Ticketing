import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { Music, Ticket, User as UserIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { name, nis, kelas } = session.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/siswa" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-white block leading-none">
                Konser Puncak Angkatan
              </span>
              <span className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase">
                Portal Siswa
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Profile Badge */}
            <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-[11px]">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-200 leading-tight">
                  {name || "Siswa"}
                </div>
                <div className="text-[10px] text-slate-400">
                  NIS: {nis} {kelas ? `• ${kelas}` : ""}
                </div>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Konser Puncak Angkatan. Hak Cipta Dilindungi.</span>
          <span className="inline-flex items-center gap-1.5 text-slate-400">
            <Ticket className="w-3.5 h-3.5 text-indigo-400" />
            Sistem Reservasi & Tiket Digital
          </span>
        </div>
      </footer>
    </div>
  );
}
