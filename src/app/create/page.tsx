"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { Loader2, UserPlus } from "lucide-react";
import { z } from "zod";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/DashboardLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormField } from "@/components/ui/FormField";

import { personSchema } from "@/shared/schemas/person.schema";
import { useCepAutoFill } from "@/shared/hooks/useCep";
import { cleanCharacter, formatDateToISO } from "@/shared/utils/formatData";
import { createPersonRequest } from "@/service/person.service";
import { useAuth } from "@/shared/providers/auth.providers";

type FormData = z.infer<typeof personSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      mother_name: "",
      cpf: "",
      birth_date: "",
      status: "active",
      email: "",
      parent: user?.id,
      phone: "",
      address: {
        zip_code: "",
        address: "",
        address_number: "",
        address_complement: "",
        city: "",
        state: "",
        country: "Brasil",
      },
    },
  });

  const { handleCepChange } = useCepAutoFill<FormData>(setValue);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      birth_date: formatDateToISO(data.birth_date),
      phone: cleanCharacter(data.phone as string),
      cpf: cleanCharacter(data.cpf),
    };

    const promise = createPersonRequest(payload);

    toast.promise(promise, {
      loading: "Salvando...",
      success: "Cadastro realizado!",
      error: "Erro ao cadastrar",
    });

    await promise;
    router.push("/dashboard");
  };

  return (
    <DashboardLayout>
      <PageHeader
        icon={UserPlus}
        title="Novo Cadastro"
        subtitle="Preencha os dados para adicionar um novo membro"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
        {/* DADOS PESSOAIS */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Dados pessoais
          </h2>

          <div className="space-y-4">
            <FormField
              label="Nome completo"
              error={errors.name?.message}
              required
            >
              <input {...register("name")} className="input" />
            </FormField>

            <FormField
              label="Nome da mãe"
              error={errors.mother_name?.message}
              required
            >
              <input {...register("mother_name")} className="input" />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="CPF" error={errors.cpf?.message} required>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="000.000.000-00"
                      className="input"
                      onAccept={v => field.onChange(v)}
                    />
                  )}
                />
              </FormField>

              <FormField
                label="Nascimento"
                error={errors.birth_date?.message}
                required
              >
                <Controller
                  name="birth_date"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="00/00/0000"
                      className="input"
                      onAccept={v => field.onChange(v)}
                    />
                  )}
                />
              </FormField>
            </div>

            <FormField label="Email" error={errors.email?.message} required>
              <input {...register("email")} type="email" className="input" />
            </FormField>

            <FormField label="Telefone" error={errors.phone?.message} required>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    mask="(00) 00000-0000"
                    className="input"
                    value={field.value ?? ""}
                    onAccept={v => field.onChange(v)}
                  />
                )}
              />
            </FormField>
          </div>
        </div>

        {/* ENDEREÇO */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Endereço</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="CEP"
                error={errors.address?.zip_code?.message}
                required
              >
                <Controller
                  name="address.zip_code"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      mask="00000-000"
                      className="input"
                      onAccept={value => {
                        field.onChange(value);
                        handleCepChange(value);
                      }}
                    />
                  )}
                />
              </FormField>

              <FormField label="Número">
                <input
                  {...register("address.address_number")}
                  className="input"
                />
              </FormField>
            </div>

            <FormField
              label="Endereço"
              error={errors.address?.address?.message}
              required
            >
              <input {...register("address.address")} className="input" />
            </FormField>

            <FormField label="Complemento">
              <input
                {...register("address.address_complement")}
                className="input"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Cidade"
                error={errors.address?.city?.message}
                required
              >
                <input {...register("address.city")} className="input" />
              </FormField>

              <FormField
                label="UF"
                error={errors.address?.state?.message}
                required
              >
                <input
                  {...register("address.state")}
                  maxLength={2}
                  className="input uppercase"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 px-6 bg-amber-500 hover:bg-amber-600 rounded-lg text-black font-semibold flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
