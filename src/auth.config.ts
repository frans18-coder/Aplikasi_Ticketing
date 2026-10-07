import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user as { role?: string } | undefined;
      const role = user?.role;
      const pathname = nextUrl.pathname;

      // Halaman login
      if (pathname === "/login") {
        if (isLoggedIn) {
          if (role === "ADMIN") return Response.redirect(new URL("/admin", nextUrl));
          if (role === "PETUGAS") return Response.redirect(new URL("/petugas", nextUrl));
          return Response.redirect(new URL("/siswa", nextUrl));
        }
        return true;
      }

      // Halaman Admin: hanya ADMIN yang boleh
      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        if (role !== "ADMIN") {
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
        return true;
      }

      // Halaman Petugas: PETUGAS atau ADMIN yang boleh
      if (pathname.startsWith("/petugas")) {
        if (!isLoggedIn) return false;
        if (role !== "PETUGAS" && role !== "ADMIN") {
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
        return true;
      }

      // Halaman Siswa: semua user yang login (Siswa, Petugas, Admin)
      if (pathname.startsWith("/siswa")) {
        if (!isLoggedIn) return false;
        return true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nis = user.nis;
        token.role = user.role;
        token.kelas = user.kelas;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        if (token.id) session.user.id = token.id as string;
        session.user.nis = token.nis as string | undefined;
        session.user.role = token.role as any;
        session.user.kelas = token.kelas as string | null | undefined;
      }
      return session;
    },
  },
  providers: [],
};
