"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { User } from "lucide-react";
import { useAuth } from "@/shared/providers/auth.providers";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <DashboardLayout>
        <div className="card p-8 text-center max-w-md mx-auto">
          <p>Nenhum perfil encontrado.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        icon={User}
        title="Meu Perfil"
        subtitle="Informações básicas do usuário"
      />

      <div className="card p-6 max-w-xl space-y-4">
        <div>
          <span className="text-sm text-gray-500">Nome</span>
          <p className="font-medium">{user.name}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Nome</span>
          <p className="font-medium">{user.mother_name}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Data de nascimento</span>
          <p className="font-medium">{user.birth_date}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Email</span>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">CPF</span>
          <p className="font-medium">{user.cpf}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Telefone</span>
          <p className="font-medium">{user.phone}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Status</span>
          <p className="font-medium">{user.status}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500">Parent</span>
          <p className="font-medium">{user.parent ?? "—"}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
