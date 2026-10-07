import { prisma } from "@/lib/prisma";
import { QrCode, Search, CheckCircle, Clock } from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Portal Petugas — Validasi Tiket Konser",
};

export default async function PetugasPage() {
  const [totalValidCheckins, recentLogs] = await Promise.all([
    prisma.checkin.count({ where: { status: "VALID" } }),
    prisma.checkin.findMany({
      take: 10,
      orderBy: { scannedAt: "desc" },
      include: {
        ticket: {
          include: {
            ticketCategory: true,
          },
        },
      },
    }),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Pusat Pemeriksaan & Validasi Tiket
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gunakan scanner kamera atau masukkan kode unik tiket untuk validasi masuk
          penonton di pintu gerbang konser.
        </p>
      </div>

      {/* Ticket Validation Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Input Manual / Scan Tiket</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Arahkan barcode scanner atau ketikkan nomor seri tiket yang tertera pada e-tiket
            atau gelang penonton.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Masukkan Kode Tiket (misal: TKT-2026-XXXX)"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent uppercase font-mono"
              />
            </div>
            <button
              type="button"
              className="py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Validasi Tiket
            </button>
          </div>
        </div>
      </div>

      {/* Stat Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">
              Total Pengunjung Masuk (Valid)
            </span>
            <span className="text-2xl font-black text-emerald-400">
              {totalValidCheckins} Penonton
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Status Gerbang</span>
            <span className="text-2xl font-black text-amber-400">Gate Buka • Siap</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Checkin History */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-800">
          <h2 className="font-bold text-white text-base">Riwayat Validasi Terakhir</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            10 tiket terakhir yang dipindai di pintu masuk
          </p>
        </div>

        {recentLogs.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Belum ada riwayat check-in penonton. Mulai lakukan validasi di atas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3 font-semibold">Kode Tiket</th>
                  <th className="px-5 py-3 font-semibold">Kategori</th>
                  <th className="px-5 py-3 font-semibold">Status Validasi</th>
                  <th className="px-5 py-3 font-semibold">Waktu Check-in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-5 py-3.5 font-mono font-bold text-white">
                      {log.ticket.qrCode}
                    </td>
                    <td className="px-5 py-3.5">{log.ticket.ticketCategory.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {log.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">
                      {new Date(log.scannedAt).toLocaleTimeString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
