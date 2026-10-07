import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nis?: string;
      role?: Role;
      kelas?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    nis?: string;
    role?: Role;
    kelas?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    nis?: string;
    role?: Role;
    kelas?: string | null;
  }
}
