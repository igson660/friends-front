"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { GitBranch, Users } from "lucide-react";
import { listNetWorkRequest } from "@/service/person.service";
import { useAuth } from "@/shared/providers/auth.providers";
import { INetworkNode } from "@/shared/types/models/networkNode.model";
import { NodeCard } from "@/components/NodeCard";

const totalNetwork = (nodes: INetworkNode[]): number => {
  let total = 0;
  for (const node of nodes) {
    total += 1;
    if (node.children.length > 0) {
      total += totalNetwork(node.children);
    }
  }
  return total;
};

export default function NetworkPage() {
  const { user } = useAuth();
  const [networkRoot, setNetworkRoot] = useState<INetworkNode | null>(null);

  useEffect(() => {
    const loadNetwork = async () => {
      if (!user?.id) return;
      const response = await listNetWorkRequest(user.id);
      if (response.status === "success" && response.data) {
        setNetworkRoot(response.data);
      }
    };
    loadNetwork();
  }, [user?.id]);

  if (!networkRoot) {
    return (
      <DashboardLayout>
        <PageHeader
          icon={GitBranch}
          title="Minha Rede"
          subtitle="Visualização hierárquica da sua rede"
        />
        <div className="card p-10 text-center">
          <Users
            size={40}
            style={{ color: "var(--color-text-muted)", margin: "0 auto 12px" }}
          />
          <p style={{ color: "var(--color-text-secondary)" }}>
            Carregando rede...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        icon={GitBranch}
        title="Minha Rede"
        subtitle="Visualização hierárquica da sua rede"
      />

      <div
        className="card p-4 mb-6 flex items-center gap-6 flex-wrap"
        style={{ borderColor: "rgba(245,158,11,0.25)" }}
      >
        {[
          ["Indicações diretas", `${networkRoot.children.length}`],
          ["Total da rede", `${totalNetwork(networkRoot.children) + 1}`],
          ["Nível na rede", `N${networkRoot.network_level ?? 0}`],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {label}
            </p>
            <p
              className="text-lg font-bold font-display"
              style={{ color: "var(--color-text-primary)" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <NodeCard node={networkRoot} depth={0} />
    </DashboardLayout>
  );
}
