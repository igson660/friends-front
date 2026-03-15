export interface INetworkNode {
  id: string;
  name: string;
  birth_date?: string;
  email?: string;
  cpf?: string;
  parent?: string | null;
  phone?: string;
  status?: string;
  city?: string;
  state?: string;
  network_level?: number;
  is_voter_valid?: boolean;
  voter_verification_status?: string;
  children: INetworkNode[];
  direct_count?: number;
  remaining_slots?: number;
}
