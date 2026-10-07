import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { ShieldCheck, UserCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const { name, nis } = session.user;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base tracking-tight text-white block leading-none">
                  Admin Panel
                </span>
                <span className="text-[10px] text-purple-400 font-semibold tracking-wider uppercase">
                  Konser Puncak Angkatan
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-semibold"
              >
                Ringkasan
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-[11px]">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-purple-200 leading-tight">
                  {name || "Administrator"}
                </div>
                <div className="text-[10px] text-purple-400">
                  NIS: {nis} • Role: ADMIN
                </div>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 Konser Puncak Angkatan — Admin Panel</span>
          <span className="text-slate-400">Prisma ORM • Supabase PostgreSQL</span>
        </div>
      </footer>
    </div>
  );
}
