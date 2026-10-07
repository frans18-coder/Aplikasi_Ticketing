import { prisma } from "@/lib/prisma";
import { Users, Ticket, UserCheck, ShieldAlert, Layers } from "lucide-react";

export const instant = false;

export const metadata = {
  title: "Admin Dashboard — Konser Puncak Angkatan",
};

export default async function AdminPage() {
  // Ambil metrik dari database
  const [totalStudents, totalOfficers, categories, students] = await Promise.all([
    prisma.user.count({ where: { role: "SISWA" } }),
    prisma.user.count({ where: { role: "PETUGAS" } }),
    prisma.ticketCategory.findMany({ orderBy: { price: "desc" } }),
    prisma.user.findMany({
      where: { role: "SISWA" },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const totalQuota = categories.reduce((sum, c) => sum + c.quota, 0);
  const totalSold = categories.reduce((sum, c) => sum + c.sold, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ringkasan Sistem & Penjualan
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Pantau statistik pengguna, ketersediaan tiket, dan aktivitas pendaftaran secara
          real-time.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Siswa
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalStudents}</div>
          <p className="text-[11px] text-slate-500 mt-1">Siswa terdaftar di database</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Petugas Validasi
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalOfficers}</div>
          <p className="text-[11px] text-slate-500 mt-1">Petugas scan & verifikasi</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Kapasitas Tiket
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalQuota.toLocaleString("id-ID")}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total kuota seluruh kategori</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tiket Terjual
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {totalSold.toLocaleString("id-ID")}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sisa: {(totalQuota - totalSold).toLocaleString("id-ID")} tiket
          </p>
        </div>
      </div>

      {/* Kategori Tiket Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-white text-base">Kategori & Kuota Tiket</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daftar harga dan alokasi kursi untuk setiap kategori tiket konser
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">Nama Kategori</th>
                <th className="px-5 py-3 font-semibold">Harga</th>
                <th className="px-5 py-3 font-semibold">Total Kuota</th>
                <th className="px-5 py-3 font-semibold">Terjual</th>
                <th className="px-5 py-3 font-semibold">Sisa Kuota</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {categories.map((cat) => {
                const remaining = cat.quota - cat.sold;
                return (
                  <tr key={cat.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-5 py-3.5 font-bold text-white">{cat.name}</td>
                    <td className="px-5 py-3.5 font-medium">
                      Rp {cat.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-5 py-3.5">{cat.quota}</td>
                    <td className="px-5 py-3.5">{cat.sold}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-400">
                      {remaining}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {cat.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Students Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-800">
          <h2 className="font-bold text-white text-base">Daftar Akun Siswa</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            10 siswa terbaru yang terdaftar di database sistem
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">NIS</th>
                <th className="px-5 py-3 font-semibold">Nama Lengkap</th>
                <th className="px-5 py-3 font-semibold">Kelas</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Terdaftar Pada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {students.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-5 py-3.5 font-mono font-bold text-indigo-400">
                    {stu.nis}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-white">{stu.name}</td>
                  <td className="px-5 py-3.5">{stu.kelas || "-"}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {stu.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {new Date(stu.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
