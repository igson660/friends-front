"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { User } from "lucide-react";
import { useAuth } from "@/shared/providers/auth.providers";
import {
  formatDateFromISO,
  formatPhone,
  formatCPF,
} from "@/shared/utils/formatData";

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

  const fields = [
    { label: "Nome", value: user.name },
    { label: "Mãe", value: user.mother_name },
    { label: "Data de nascimento", value: formatDateFromISO(user.birth_date) },
    { label: "Email", value: user.email },
    { label: "CPF", value: formatCPF(user.cpf) },
    { label: "Telefone", value: formatPhone(user.phone) },
    { label: "Status", value: user.status },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        icon={User}
        title="Meu Perfil"
        subtitle="Informações básicas do usuário"
      />

      <div className="card p-6 max-w-xl space-y-4">
        {fields.map(field => (
          <div key={field.label}>
            <span className="text-sm text-gray-500">{field.label}</span>
            <p className="font-medium">{field.value}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
