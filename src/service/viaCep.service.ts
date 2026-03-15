import { api } from "@/config/networkCore";
import { IAddressResponseViacep } from "@/shared/types/models/address.model";
import toast from "react-hot-toast";

export const viaCepRequest = async (
  cep: string,
  signal?: AbortSignal,
): Promise<IAddressResponseViacep | null> => {
  if (cep.length !== 8) return null;

  try {
    return await api
      .url(`viacep/${cep}/`)
      .options({ signal })
      .get()
      .json<IAddressResponseViacep>();
  } catch {
    toast.error("Erro ao carregar o endereço.");
    return null;
  }
};
