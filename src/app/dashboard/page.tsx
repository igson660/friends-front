"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import toast from "react-hot-toast";
import { LayoutDashboard, UserPlus, GitBranch, Copy } from "lucide-react";

interface PersonNode {
  id: string;
  name: string;
  children: PersonNode[];
}

import { useAuth } from "@/shared/providers/auth.providers";
import { listNetWorkRequest } from "@/service/person.service";
import { IPerson } from "@/shared/types/models/person.model";

export default function DashboardPage() {
  const { user } = useAuth();

  const [network, setNetwork] = useState<IPerson[]>([]);
  const [copied, setCopied] = useState(false);

  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/register/${user?.id}`
      : "";

  const copyInvite = () => {
    if (!inviteLink) return;

    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Link copiado!");

    setTimeout(() => setCopied(false), 2000);
  };

  const totalNetWork = (nodes: PersonNode[]): number => {
    let total = 0;
    for (const node of nodes) {
      total += 1;
      total += totalNetWork(node.children);
    }
    return total;
  };

  useEffect(() => {
    const loadNetwork = async () => {
      if (!user?.id) return;

      const response = await listNetWorkRequest(user.id);

      setNetwork(response.data.children || []);
    };

    loadNetwork();
  }, [user?.id]);

  const directCount = network.length;

  return (
    <DashboardLayout>
      <PageHeader
        icon={LayoutDashboard}
        title={`Olá, ${user?.name || "Amigo"} 👋`}
        subtitle="Acompanhe o crescimento da sua rede"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Indicações diretas"
          value={directCount}
          icon={UserPlus}
          color="#60a5fa"
        />

        <StatCard
          label="Rede total"
          value={totalNetWork(network)}
          icon={GitBranch}
          color="#a78bfa"
        />
      </div>

      <div className="card p-5 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <UserPlus size={15} className="text-amber-500" />

          <h2 className="text-sm font-semibold text-white">
            Seu Link de Convite
          </h2>
        </div>

        <div className="flex gap-2">
          <input
            readOnly
            value={inviteLink}
            className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm text-neutral-300"
          />

          <button
            onClick={copyInvite}
            className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-3 py-2 rounded text-sm hover:bg-neutral-700"
          >
            <Copy size={13} />
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
