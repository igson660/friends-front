export interface IAddressBase {
  zip_code: string;
  address: string;
  address_number: string;
  address_complement?: string;
  state: string;
  city: string;
  country: string;
}

export interface IAddressItem extends IAddressBase {
  readonly id: string;
}

export interface IAddressData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IAddressItem[];
  readonly total_pages: number;
}

export interface IAddressCreate extends IAddressBase {}

export interface IAddressResponse {
  readonly status: "success";
  readonly data: IAddressData;
}

export interface IAddressResponseViacep {
  readonly status: "success";
  readonly data: IAddressBase;
}

export interface IAddressResponseDetails {
  readonly status: "success";
  readonly data: IAddressItem;
}

export interface IAddressResponseList extends IAddressBase {
  address: string;
  address_number: string;
  state: string;
  city: string;
}
