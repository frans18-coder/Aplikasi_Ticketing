"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const nis = formData.get("nis")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!nis || !password) {
    return { error: "NIS dan password wajib diisi." };
  }

  try {
    await signIn("credentials", {
      nis,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "NIS atau password salah. Silakan coba lagi." };
        default:
          return { error: "Terjadi kesalahan saat login. Coba beberapa saat lagi." };
      }
    }
    // Jika ada error lain atau redirect
    return { error: "NIS atau password tidak valid." };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
