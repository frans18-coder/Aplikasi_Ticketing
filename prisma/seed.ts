import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai seeding...");

  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";
  const petugasPassword = process.env.SEED_PETUGAS_PASSWORD || "Petugas@12345";
  const siswaPassword = "Siswa@12345";

  // ─── ADMIN ───────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { nis: "ADMIN001" },
    update: {},
    create: {
      nis: "ADMIN001",
      name: "Administrator",
      email: "admin@puncakangkatan.id",
      password: await bcrypt.hash(adminPassword, 12),
      role: Role.ADMIN,
      kelas: null,
    },
  });
  console.log(`✅ Admin: ${admin.name} (NIS: ${admin.nis})`);

  // ─── PETUGAS ─────────────────────────────────────────────
  const petugas = await prisma.user.upsert({
    where: { nis: "PETUGAS001" },
    update: {},
    create: {
      nis: "PETUGAS001",
      name: "Petugas Satu",
      email: "petugas1@puncakangkatan.id",
      password: await bcrypt.hash(petugasPassword, 12),
      role: Role.PETUGAS,
      kelas: null,
    },
  });
  console.log(`✅ Petugas: ${petugas.name} (NIS: ${petugas.nis})`);

  // ─── SISWA CONTOH ─────────────────────────────────────────
  const siswaData = [
    { nis: "2425001", name: "Andi Saputra",    kelas: "XII RPL 1" },
    { nis: "2425002", name: "Budi Santoso",    kelas: "XII RPL 1" },
    { nis: "2425003", name: "Citra Dewi",      kelas: "XII RPL 2" },
    { nis: "2425004", name: "Dina Rahayu",     kelas: "XII TKJ 1" },
    { nis: "2425005", name: "Eko Prasetyo",    kelas: "XII TKJ 2" },
  ];

  for (const s of siswaData) {
    const siswa = await prisma.user.upsert({
      where: { nis: s.nis },
      update: {},
      create: {
        nis: s.nis,
        name: s.name,
        kelas: s.kelas,
        password: await bcrypt.hash(siswaPassword, 12),
        role: Role.SISWA,
      },
    });
    console.log(`✅ Siswa: ${siswa.name} — ${siswa.kelas}`);
  }

  // ─── KATEGORI TIKET ───────────────────────────────────────
  const categories = [
    {
      name: "VVIP",
      description: "Kursi terdepan, akses backstage, merchandise eksklusif",
      price: 250_000,
      quota: 50,
    },
    {
      name: "VIP",
      description: "Kursi prioritas, goodie bag, akses area khusus",
      price: 150_000,
      quota: 150,
    },
    {
      name: "Reguler",
      description: "Tiket masuk standar, area berdiri",
      price: 75_000,
      quota: 500,
    },
  ];

  for (const cat of categories) {
    const category = await prisma.ticketCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    console.log(
      `✅ Kategori: ${category.name} — Rp ${category.price.toLocaleString("id-ID")} (kuota: ${category.quota})`
    );
  }

  console.log("\n🎉 Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
