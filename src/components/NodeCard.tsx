import { INetworkNode } from "@/shared/types/models/networkNode.model";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const voterStatusBadge = (status?: string, valid?: boolean) => {
  if (valid) return "badge-green";
  if (status === "pending") return "badge-yellow";
  return "badge-red";
};

const voterStatusLabel = (status?: string) => {
  if (!status) return "N/A";
  if (status === "pending") return "Pendente";
  if (status === "verified") return "Verificado";
  return status;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export function NodeCard({
  node,
  depth = 0,
}: {
  node: INetworkNode;
  depth?: number;
}) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children.length > 0;

  return (
    <div style={{ marginLeft: depth > 0 ? "24px" : "0" }}>
      <div
        className="card mb-2 flex items-center gap-3 p-3 cursor-pointer transition-all hover:border-[var(--color-gold-500)]/30"
        style={{
          borderColor:
            depth === 0 ? "rgba(245,158,11,0.35)" : "var(--color-border)",
        }}
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        <div className="shrink-0 w-4">
          {hasChildren ? (
            open ? (
              <ChevronDown
                size={14}
                style={{ color: "var(--color-text-muted)" }}
              />
            ) : (
              <ChevronRight
                size={14}
                style={{ color: "var(--color-text-muted)" }}
              />
            )
          ) : null}
        </div>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg,#f59e0b,#d97706)",
            color: "#0a0a0f",
          }}
        >
          {getInitials(node.name)}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{ color: "var(--color-text-primary)" }}
          >
            {node.name}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {node.city && node.state
              ? `${node.city}, ${node.state}`
              : "Sem localização"}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`badge ${voterStatusBadge(node.voter_verification_status, node.is_voter_valid)}`}
          >
            {node.is_voter_valid
              ? "✓"
              : voterStatusLabel(node.voter_verification_status)}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            N{node.network_level ?? 0}
          </span>
          {hasChildren && (
            <span className="badge badge-blue">{node.children.length}</span>
          )}
        </div>
      </div>

      {/* Children */}
      {open &&
        hasChildren &&
        node.children.map((child) => (
          <NodeCard key={child.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}
