"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  User,
  LogOut,
  Users,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "@/shared/providers/auth.providers";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/network", label: "Minha Rede", icon: GitBranch },
  { href: "/profile", label: "Perfil", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="lg:hidden flex items-center justify-between px-3 h-11"
        style={{
          background: "var(--color-bg-surface)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
            }}
          >
            <Users size={14} color="#0a0a0f" />
          </div>
        </div>

        <button onClick={() => setOpen(true)} className="p-1">
          <Menu size={20} />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static z-50 top-0 left-0 h-screen w-64
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}
        style={{
          background: "var(--color-bg-surface)",
          borderRight: "1px solid var(--color-border)",
        }}
      >
        {/* HEADER */}
        <header
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
              }}
            >
              <Users size={16} color="#0a0a0f" />
            </div>

            <span
              className="font-semibold text-sm"
              style={{ color: "var(--color-text-primary)" }}
            >
              AMIGOS
            </span>
          </div>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </header>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active ? "" : "hover:bg-[var(--color-bg-elevated)]"
                }`}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg,#f59e0b,#d97706)",
                        color: "#0a0a0f",
                      }
                    : { color: "var(--color-text-secondary)" }
                }
              >
                <Icon
                  size={16}
                  style={
                    active
                      ? { color: "#0a0a0f" }
                      : { color: "var(--color-text-muted)" }
                  }
                />

                <span className="flex-1">{label}</span>

                {active && (
                  <ChevronRight size={14} style={{ color: "#0a0a0f" }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* USER */}
        <footer
          className="px-3 py-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {user && (
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-lg mb-2"
              style={{ background: "var(--color-bg-elevated)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#d97706)",
                  color: "#0a0a0f",
                }}
              >
                {getInitials(user.name)}
              </div>

              <p
                className="text-sm font-medium truncate"
                style={{ color: "var(--color-text-primary)" }}
              >
                {user.name}
              </p>
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm hover:bg-[var(--color-bg-elevated)]"
            style={{ color: "var(--color-error)" }}
          >
            <LogOut size={15} />
            Sair
          </button>
        </footer>
      </aside>
    </>
  );
}

function getInitials(name?: string) {
  if (!name) return "?";

  const parts = name.trim().split(" ");

  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
}
