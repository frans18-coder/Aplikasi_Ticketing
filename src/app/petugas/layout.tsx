import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { QrCode, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default async function PetugasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "PETUGAS" && session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const { name, nis, role } = session.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/petugas" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-white block leading-none">
                Portal Petugas
              </span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                Validasi & Check-in Tiket
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[11px]">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-amber-200 leading-tight">
                  {name || "Petugas"}
                </div>
                <div className="text-[10px] text-amber-400">
                  NIS: {nis} • Role: {role}
                </div>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Konser Puncak Angkatan — Portal Petugas</span>
          <span className="text-slate-400">Scan & Verifikasi QR Code</span>
        </div>
      </footer>
    </div>
  );
}
