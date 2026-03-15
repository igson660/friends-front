import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

export function PageHeader({ icon: Icon, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(245,158,11,0.1)" }}
      >
        <Icon size={20} style={{ color: "var(--color-gold-500)" }} />
      </div>
      <div>
        <h1
          className="text-2xl font-bold font-display leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
