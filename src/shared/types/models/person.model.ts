import { IAddressCreate } from "./address.model";

export interface IPersonBase {
  readonly name: string;
  readonly parent: string;
  readonly cpf: string;
  readonly birth_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: string;
}

export interface IPersonCreate extends IPersonBase {
  readonly address: IAddressCreate;
}

export interface IPerson {
  id: string;
  name: string;
  status: "active" | "inactive" | "blocked";
  children: IPerson[];
}
export interface IPersonResponse {
  status: "success";
  data: IPerson;
}
