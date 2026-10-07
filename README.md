# Aplikasi Ticketing — Konser Puncak Angkatan

Sistem ticketing berbasis web untuk acara Konser Puncak Angkatan.
Dibangun dengan **Next.js 16**, **TypeScript**, **Tailwind CSS**, dan **App Router**.

---

## Cara Menjalankan Lokal

### Prasyarat

- Node.js **18+**
- npm **9+**

### Langkah-langkah

```bash
# 1. Clone repositori
git clone https://github.com/frans18-coder/Aplikasi_Ticketing.git
cd Aplikasi_Ticketing

# 2. Salin file environment dan isi nilainya
cp .env.example .env

# 3. Instal dependensi
npm install

# 4. Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build Produksi

```bash
npm run build
npm run start
```

---

## Variabel Environment

Salin `.env.example` ke `.env`, lalu isi setiap variabel:

| Variabel                | Keterangan                                        |
| ----------------------- | ------------------------------------------------- |
| `DATABASE_URL`          | URL koneksi database utama (Prisma / Supabase)    |
| `DIRECT_URL`            | URL koneksi langsung (untuk Prisma migrations)    |
| `AUTH_SECRET`           | Secret key untuk autentikasi (NextAuth / Auth.js) |
| `SEED_ADMIN_PASSWORD`   | Password default akun admin saat seeding          |
| `SEED_PETUGAS_PASSWORD` | Password default akun petugas saat seeding        |

> **Perhatian:** Jangan pernah meng-commit file `.env` ke repositori.

---

## Struktur Proyek

```
src/
├── app/          # Halaman & layout (Next.js App Router)
├── components/   # Komponen React yang dapat digunakan ulang
└── lib/          # Utilitas, helper, dan konfigurasi
```

---

## Lisensi

MIT
