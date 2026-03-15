import toast from "react-hot-toast";

import { api } from "@/config/networkCore";
import { IAuthResponse, ICredentials } from "@/shared/types/models/auth.model";

export const authRequest = async (
  data: ICredentials,
): Promise<IAuthResponse> => {
  try {
    return await api.url("auth/").json(data).post().json<IAuthResponse>();
  } catch {
    toast.error("Erro ao logar.");
    throw new Error("AUTH_ERROR");
  }
};
