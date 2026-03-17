"use client";

import { INetworkNode } from "@/shared/types/models/networkNode.model";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import { useMemo, useState } from "react";

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

// 🔥 função otimizada (recursiva)
function countTotalNetwork(node: INetworkNode): number {
  if (!node.children?.length) return 0;

  let total = 0;

  for (const child of node.children) {
    total += 1 + countTotalNetwork(child);
  }

  return total;
}

export function NodeCard({
  node,
  depth = 0,
}: {
  node: INetworkNode;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);

  const hasChildren = !!node.children?.length;

  // 🔥 evita recalcular toda renderização
  const totalNetwork = useMemo(() => {
    return countTotalNetwork(node);
  }, [node]);

  const toggle = () => {
    if (hasChildren) setOpen(prev => !prev);
  };

  return (
    <div className="w-full" style={{ paddingLeft: depth * 16 }}>
      <div
        onClick={toggle}
        className="card mb-2 flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:border-amber-500/40 hover:bg-neutral-900/40 active:scale-[0.99]"
        style={{
          borderColor:
            depth === 0 ? "rgba(245,158,11,0.35)" : "var(--color-border)",
        }}
      >
        {/* Expand icon */}
        <div className="w-4 shrink-0 flex justify-center">
          {hasChildren &&
            (open ? (
              <ChevronDown size={14} className="text-neutral-400" />
            ) : (
              <ChevronRight size={14} className="text-neutral-400" />
            ))}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-amber-500 to-amber-600 text-black">
          <User size={16} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{node.name}</p>

          <p className="text-xs text-neutral-400 truncate">
            {node.city && node.state
              ? `${node.city}, ${node.state}`
              : "Sem localização"}
          </p>
        </div>

        {/* Status + métricas */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`badge ${voterStatusBadge(
              node.voter_verification_status,
              node.is_voter_valid
            )}`}
          >
            {node.is_voter_valid
              ? "✓"
              : voterStatusLabel(node.voter_verification_status)}
          </span>

          <span className="text-xs text-neutral-400">
            N{node.network_level ?? 0}
          </span>

          {hasChildren && (
            <span className="badge badge-blue">{totalNetwork}</span>
          )}
        </div>
      </div>

      {/* Children */}
      {open && hasChildren && (
        <div className="space-y-1">
          {node.children.map(child => (
            <NodeCard key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
