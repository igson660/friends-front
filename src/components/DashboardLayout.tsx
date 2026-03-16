"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/shared/providers/auth.providers";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-bg-base)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin"
            style={{ color: "var(--color-gold-500)" }}
          />
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div
      className="min-h-screen lg:flex"
      style={{ background: "var(--color-bg-base)" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto animate-fade-in lg:ml-60">
        {children}
      </main>
    </div>
  );
}
