import { useRef, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { viaCepRequest } from "@/service/viaCep.service";
import { IAddressResponseViacep } from "@/shared/types/models/address.model";

export function useCepAutoFill<T extends FieldValues>(
  setValue: UseFormSetValue<T>,
) {
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, IAddressResponseViacep>>(new Map());

  const setField = <K extends Path<T>>(field: K, value: PathValue<T, K>) => {
    setValue(field, value);
  };

  const fillAddress = (response: IAddressResponseViacep) => {
    if (response.status !== "success") return;

    setField(
      "address.address" as Path<T>,
      response.data.address as PathValue<T, Path<T>>,
    );
    setField(
      "address.city" as Path<T>,
      response.data.city as PathValue<T, Path<T>>,
    );
    setField(
      "address.state" as Path<T>,
      response.data.state as PathValue<T, Path<T>>,
    );
    setField(
      "address.country" as Path<T>,
      response.data.country as PathValue<T, Path<T>>,
    );
  };

  const handleCepChange = (rawCep: string) => {
    const cep = rawCep.replace(/\D/g, "");

    if (cep.length !== 8) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (cacheRef.current.has(cep)) {
        fillAddress(cacheRef.current.get(cep)!);
        return;
      }

      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);

      try {
        const response = await viaCepRequest(cep, controller.signal);
        if (!response) return;

        cacheRef.current.set(cep, response);
        fillAddress(response);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return { handleCepChange, loading };
}
