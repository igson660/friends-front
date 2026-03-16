"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { GitBranch, Users } from "lucide-react";
import { listNetWorkRequest } from "@/service/person.service";
import { useAuth } from "@/shared/providers/auth.providers";
import { INetworkNode } from "@/shared/types/models/networkNode.model";
import { NodeCard } from "@/components/NodeCard";

const totalNetwork = (nodes: INetworkNode[]): number => {
  let total = 0;

  nodes.forEach(node => {
    total += 1;

    if (node.children && node.children.length > 0) {
      total += totalNetwork(node.children);
    }
  });

  return total;
};

export default function NetworkPage() {
  const { user } = useAuth();
  const [networkRoot, setNetworkRoot] = useState<INetworkNode | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const loadNetwork = async () => {
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

  const directCount = networkRoot.children?.length || 0;
  const total = totalNetwork(networkRoot.children || []) + 1;
  const level = networkRoot.network_level ?? 0;

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
        <div>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Indicações diretas
          </p>
          <p
            className="text-lg font-bold font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            {directCount}
          </p>
        </div>

        <div>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Total da rede
          </p>
          <p
            className="text-lg font-bold font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            {total}
          </p>
        </div>

        <div>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Nível na rede
          </p>
          <p
            className="text-lg font-bold font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            N{level}
          </p>
        </div>
      </div>

      <NodeCard node={networkRoot} depth={0} />
    </DashboardLayout>
  );
}
