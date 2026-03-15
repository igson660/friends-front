import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  loading?: boolean;
}

export function StatCard({ label, value, icon: Icon, color = "#f59e0b", loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="card p-5 animate-pulse" style={{ height: "90px" }} />
    );
  }
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
          {label}
        </p>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}20` }}
        >
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold font-display" style={{ color: "var(--color-text-primary)" }}>
        {value}
      </p>
    </div>
  );
}
