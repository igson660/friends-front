import { IPerson } from "./person.model";

export interface IPersonAuth extends IPerson {
  readonly email: string;
  readonly cpf: string;
  readonly phone: string;
  readonly parent: string;
  readonly birth_date: string;
}

export interface ICredentials {
  readonly cpf: string;
  readonly birth_date: string;
}

export interface IAuthData {
  readonly access: string;
  readonly refresh: string;
  readonly person: IPersonAuth;
}

export interface IAuthResponse {
  readonly status: "success";
  readonly data: IAuthData;
}

export interface IAuthContextData {
  user: IPersonAuth | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => void;
}
