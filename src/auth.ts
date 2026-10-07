import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "NIS & Password",
      credentials: {
        nis: { label: "NIS", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.nis || !credentials?.password) {
          return null;
        }

        const nis = String(credentials.nis).trim();
        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: { nis },
        });

        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          nis: user.nis,
          role: user.role,
          kelas: user.kelas,
        };
      },
    }),
  ],
});
