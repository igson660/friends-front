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

  const router = useRouter();
  const { login, isAuthenticated, loading } = useAuth();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
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
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        {/* HEADER */}
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Users size={30} className="text-black" />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            AMIGOS
          </h1>

          <p className="text-sm text-neutral-400 mt-2">Rede de Pessoas</p>
        </header>

        {/* CARD */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-6">
            Entrar na plataforma
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* CPF */}
            <FormField label="CPF" error={errors.cpf?.message} required>
              <IMaskInput
                mask="000.000.000-00"
                placeholder="000.000.000-00"
                inputMode="numeric"
                className="w-full h-12 rounded-lg bg-neutral-800 border border-neutral-700 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                onAccept={value => setValue("cpf", value)}
              />
            </FormField>

            {/* DATA DE NASCIMENTO */}
            <FormField
              label="Data de nascimento"
              error={errors.birth_Date?.message}
              required
            >
              <IMaskInput
                mask="00/00/0000"
                placeholder="dd/mm/aaaa"
                inputMode="numeric"
                className="w-full h-12 rounded-lg bg-neutral-800 border border-neutral-700 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                onAccept={value => setValue("birth_Date", value)}
              />
            </FormField>

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] transition rounded-lg text-black font-semibold flex items-center justify-center gap-2"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </section>

        {/* FOOTER */}
        <footer className="text-center mt-8">
          <p className="text-xs text-neutral-500 leading-relaxed">
            Não tem conta?{" "}
            <span className="text-amber-500 font-medium">
              Solicite um convite a um membro da rede.
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}
