"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-red-500/20 hover:text-red-300 border border-slate-700/60 hover:border-red-500/30 transition-all cursor-pointer disabled:opacity-50 ${className}`}
      title="Keluar dari akun"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{loading ? "Keluar..." : "Keluar"}</span>
    </button>
  );
}
