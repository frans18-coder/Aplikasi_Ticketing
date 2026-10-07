import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Ticket, Sparkles, CheckCircle2, Flame, Gift, Clock } from "lucide-react";
import Link from "next/link";

export const instant = false;

export const metadata = {
  title: "Dashboard Siswa — Konser Puncak Angkatan",
};

export default async function SiswaPage() {
  const session = await auth();
  const userId = session?.user?.id;

  // Ambil kategori tiket aktif dari Supabase
  const categories = await prisma.ticketCategory.findMany({
    where: { isActive: true },
    orderBy: { price: "desc" },
  });

  // Cek apakah siswa sudah punya tiket
  const myTickets = userId
    ? await prisma.ticket.findMany({
        where: {
          order: { userId },
        },
        include: {
          ticketCategory: true,
          order: true,
        },
      })
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Malam Puncak Paling Bergengsi Tahun Ini</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Halo, {session?.user?.name || "Teman-teman"}! 🎸
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
            Selamat datang di portal tiket resmi Konser Puncak Angkatan. Amankan kursi
            dan tiketmu sekarang sebelum kuota habis!
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>30 Oktober 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Stadion Utama Sekolah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tiket Saya Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-indigo-400" />
            <span>Tiket Saya</span>
          </h2>
          <span className="text-xs text-slate-400">
            {myTickets.length > 0 ? `${myTickets.length} tiket aktif` : "Belum ada tiket"}
          </span>
        </div>

        {myTickets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <Ticket className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-300 mb-1">
              Kamu belum memiliki tiket
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Pilih salah satu kategori tiket di bawah ini untuk melakukan pemesanan
              sebelum kuota habis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-5 shadow-lg flex items-center justify-between"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 uppercase tracking-wider mb-1.5">
                    {t.ticketCategory.name}
                  </span>
                  <div className="font-bold text-white text-base">
                    Kode Tiket: {t.qrCode}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Status: {t.isUsed ? "Sudah Digunakan" : "Aktif"} • Order #{t.orderId.slice(-6)}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Katalog Kategori Tiket */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Pilihan Kategori Tiket</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Semua kategori memiliki kuota terbatas. Harga sudah termasuk akses penuh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const isVVIP = cat.name.toUpperCase().includes("VVIP");
            const isVIP = cat.name.toUpperCase().includes("VIP") && !isVVIP;
            const remaining = cat.quota - cat.sold;

            return (
              <div
                key={cat.id}
                className={`relative rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isVVIP
                    ? "bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border-purple-500/40 shadow-xl shadow-purple-950/20"
                    : isVIP
                    ? "bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 border-indigo-500/40 shadow-xl shadow-indigo-950/20"
                    : "bg-slate-900/60 border-slate-800 shadow-lg"
                }`}
              >
                {/* Popular / Best Badge */}
                {isVVIP && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
                    Paling Eksklusif
                  </div>
                )}
                {isVIP && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-md">
                    Favorit Siswa
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-extrabold text-white">{cat.name}</h3>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700/60 text-slate-300">
                      Sisa {remaining}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-2xl font-black text-white">
                      Rp {cat.price.toLocaleString("id-ID")}
                    </div>
                    <div className="text-[11px] text-slate-400">per tiket</div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {cat.description || "Akses penuh ke acara konser."}
                  </p>

                  {/* Benefit list */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Tiket gelang & QR code resmi</span>
                    </li>
                    {isVVIP && (
                      <>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Akses baris paling depan (Front Row)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Akses Backstage & Meet & Greet</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Exclusive Angkatan Merch Bundle</span>
                        </li>
                      </>
                    )}
                    {isVIP && (
                      <>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>Kursi tribun prioritas & goodie bag</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>Jalur antrian masuk khusus VIP</span>
                        </li>
                      </>
                    )}
                    {!isVIP && !isVVIP && (
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Akses area festival berdiri</span>
                      </li>
                    )}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition duration-200 shadow-md ${
                    isVVIP
                      ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
                      : isVIP
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  }`}
                >
                  Pesan Kategori {cat.name}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Program Referral Promo Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm sm:text-base">
              Program Referral Siswa
            </h3>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Bagikan kode NIS kamu kepada teman-teman. Setiap pembelian tiket menggunakan
              referral NIS kamu akan memberikan reward merchandise eksklusif!
            </p>
          </div>
        </div>
        <div className="shrink-0 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
          <span className="block text-[10px] text-slate-400 uppercase tracking-wider">
            Kode Referral Kamu
          </span>
          <span className="font-mono font-bold text-emerald-400 text-sm">
            {session?.user?.nis || "-"}
          </span>
        </div>
      </section>
    </div>
  );
}
