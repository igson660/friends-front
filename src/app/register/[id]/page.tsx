"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { Users, Loader2 } from "lucide-react";
import { z } from "zod";

import { FormField } from "@/components/ui/FormField";
import { personSchema } from "@/shared/schemas/person.schema";
import { useCepAutoFill } from "@/shared/hooks/useCep";
import { cleanCharacter, formatDateToISO } from "@/shared/utils/formatData";
import { createPersonRequest } from "@/service/person.service";

type FormData = z.infer<typeof personSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();

  const parent = params.id as string;

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
      parent,
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

    await createPersonRequest(payload);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-bg-base)]">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-amber-500 to-amber-600">
            <Users size={26} className="text-black" />
          </div>

          <h1 className="text-2xl font-bold">Cadastro</h1>

          <p className="text-sm text-gray-500">
            Preencha seus dados para entrar na rede
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-6 space-y-4"
        >
          <FormField
            label="Nome completo"
            error={errors.name?.message}
            required
          >
            <input
              {...register("name")}
              className="input"
              placeholder="João da Silva"
            />
          </FormField>

          <FormField
            label="Nome completo da mãe"
            error={errors.mother_name?.message}
            required
          >
            <input
              {...register("mother_name")}
              className="input"
              placeholder="Maria da Silva"
            />
          </FormField>

          <FormField label="CPF" error={errors.cpf?.message} required>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000.000.000-00"
                  className="input"
                  placeholder="000.000.000-00"
                  onAccept={(v: string) => field.onChange(v)}
                />
              )}
            />
          </FormField>

          <FormField
            label="Data de nascimento"
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
                  placeholder="dd/mm/aaaa"
                  onAccept={(v: string) => field.onChange(v)}
                />
              )}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message} required>
            <input
              {...register("email")}
              type="email"
              className="input"
              placeholder="email@email.com"
            />
          </FormField>

          <FormField label="Telefone" error={errors.phone?.message} required>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  mask="(00) 00000-0000"
                  className="input"
                  placeholder="Telefone"
                  value={field.value ?? ""}
                  onAccept={value => field.onChange(value)}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                />
              )}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="CEP"
              error={errors.address?.zip_code?.message}
              required
            >
              <Controller
                control={control}
                name="address.zip_code"
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="00000-000"
                    placeholder="CEP"
                    onAccept={value => {
                      field.onChange(value);
                      handleCepChange(value);
                    }}
                    className={`input ${
                      errors.address?.zip_code ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
            </FormField>

            <FormField label="Número">
              <input
                {...register("address.address_number")}
                className="input"
                placeholder="123"
              />
            </FormField>
          </div>

          <FormField
            label="Endereço"
            error={errors.address?.address?.message}
            required
          >
            <input
              {...register("address.address")}
              className="input"
              placeholder="Rua das Flores"
            />
          </FormField>

          <FormField label="Complemento">
            <input
              {...register("address.address_complement")}
              className="input"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Cidade"
              error={errors.address?.city?.message}
              required
            >
              <input {...register("address.city")} className="input" />
            </FormField>

            <FormField
              label="Estado"
              error={errors.address?.state?.message}
              required
            >
              <input
                {...register("address.state")}
                className="input"
                maxLength={2}
              />
            </FormField>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-amber-500 hover:bg-amber-600 rounded-lg text-black font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
