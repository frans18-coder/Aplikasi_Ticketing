import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl backdrop-blur">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20 text-red-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Akses Ditolak</h1>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Akun Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya
          dapat diakses oleh role yang berwenang.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-xl transition shadow-lg shadow-indigo-600/30 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
