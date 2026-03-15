import toast from "react-hot-toast";

import { api } from "@/config/networkCore";
import {
  IPersonCreate,
  IPersonResponse,
} from "@/shared/types/models/person.model";

export const listNetWorkRequest = async (
  id: string,
): Promise<IPersonResponse> => {
  try {
    return await api.url(`people/${id}`).get().json<IPersonResponse>();
  } catch {
    toast.error("Erro ao carregar rede.");
    throw new Error("LIST_NETWORK_ERROR");
  }
};

export const createPersonRequest = async (
  data: IPersonCreate,
): Promise<IPersonResponse> => {
  try {
    toast.success("membro cadastrada com sucesso");
    return await api.url("people/").post(data).json<IPersonResponse>();
  } catch {
    toast.error("Erro ao cadastrar membro.");
    throw new Error("CREATE_MEMBER_ERROR");
  }
};
