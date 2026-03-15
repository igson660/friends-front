"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Users, Loader2 } from "lucide-react";
import { IMaskInput } from "react-imask";

import { FormField } from "@/components/ui/FormField";
import { usePublicRoute } from "@/shared/hooks/usePulbicRouter";
import { useAuth } from "@/shared/providers/auth.providers";

const schema = z.object({
  cpf: z.string().min(11, "CPF obrigatório"),
  birth_Date: z.string().min(10, "Data de nascimento obrigatória"),
});

type FormData = z.infer<typeof schema>;

function ptDateToISO(date: string) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
}

export default function LoginPage() {
  usePublicRoute();

  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    try {
      await login({
        cpf: data.cpf.replace(/\D/g, ""),
        birth_date: ptDateToISO(data.birth_Date),
      });

      router.push("/dashboard");
    } catch {
      toast.error("CPF ou data de nascimento inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-amber-500">
            <Users size={28} className="text-black" />
          </div>

          <h1 className="text-3xl font-bold text-white">AMIGOS</h1>
          <p className="text-sm text-neutral-400 mt-1">Rede de Pessoas</p>
        </div>

        <div className="bg-neutral-900 rounded-xl p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-5">
            Entrar na plataforma
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* CPF */}
            <FormField label="CPF" error={errors.cpf?.message} required>
              <IMaskInput
                mask="000.000.000-00"
                placeholder="000.000.000-00"
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white"
                onAccept={(value) => setValue("cpf", value)}
              />
            </FormField>

            {/* DATA */}
            <FormField
              label="Data de nascimento"
              error={errors.birth_Date?.message}
              required
            >
              <IMaskInput
                mask="00/00/0000"
                placeholder="dd/mm/aaaa"
                className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white"
                onAccept={(value) => setValue("birth_Date", value)}
              />
            </FormField>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-2 rounded-md flex items-center justify-center gap-2"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Não tem conta?{" "}
          <span className="text-amber-500">
            Solicite um convite a um membro da rede.
          </span>
        </p>
      </div>
    </div>
  );
}
