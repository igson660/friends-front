import toast from "react-hot-toast";

import { api } from "@/config/networkCore";
import {
  IAddressCreate,
  IAddressResponse,
} from "@/shared/types/models/address.model";

export const listAddressRequest = async (): Promise<IAddressResponse> => {
  try {
    return await api.url("/addresses/").get().json<IAddressResponse>();
  } catch {
    toast.error("Erro ao carregar endereços.");
    throw new Error("LIST_ADDRESS_ERROR");
  }
};

export const retrieveAddressRequest = async (
  id: string,
): Promise<IAddressResponse> => {
  try {
    return await api.url(`/addresses/${id}/`).get().json<IAddressResponse>();
  } catch {
    toast.error("Erro ao carregar endereço.");
    throw new Error("RETRIEVE_ADDRESS_ERROR");
  }
};

export const createAddressRequest = async (
  data: IAddressCreate,
): Promise<IAddressResponse> => {
  try {
    return await api
      .url("/addresses/")
      .post(JSON.stringify(data))
      .json<IAddressResponse>();
  } catch {
    toast.error("Erro ao criar endereço.");
    throw new Error("CREATE_ADDRESS_ERROR");
  }
};

export const updateAddressRequest = async (
  id: string,
  data: Partial<IAddressCreate>,
): Promise<IAddressResponse> => {
  try {
    return await api
      .url(`/addresses/${id}/`)
      .patch(JSON.stringify(data))
      .json<IAddressResponse>();
  } catch {
    toast.error("Erro ao atualizar endereço.");
    throw new Error("UPDATE_ADDRESS_ERROR");
  }
};

export const deleteAddressRequest = async (id: string): Promise<void> => {
  try {
    await api.url(`/addresses/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar endereço.");
    throw new Error("DELETE_ADDRESS_ERROR");
  }
};
