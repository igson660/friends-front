"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  Map,
  User,
  Link2,
  LogOut,
  Users,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/shared/providers/auth.providers";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/network", label: "Minha Rede", icon: GitBranch },
  // { href: "/map", label: "Mapa", icon: Map },
  { href: "/profile", label: "Perfil", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className="flex flex-col w-60 shrink-0 h-screen sticky top-0 overflow-y-auto"
      style={{
        background: "var(--color-bg-surface)",
        borderRight: "1px solid var(--color-border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
        >
          <Users size={18} color="#0a0a0f" />
        </div>
        <div>
          <p
            className="font-display font-bold text-sm leading-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            AMIGOS
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Rede de Pessoas
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
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
                className="shrink-0"
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

      {/* User */}
      <div
        className="px-3 py-4"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {user && (
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg mb-2"
            style={{ background: "var(--color-bg-elevated)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
                color: "#0a0a0f",
              }}
            >
              {getInitials(user.name)}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: "var(--color-text-primary)" }}
              >
                {user.name}
              </p>
            </div>
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
      </div>
    </aside>
  );
}

function getInitials(name?: string) {
  if (!name) return "?";

  const parts = name.split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
}
