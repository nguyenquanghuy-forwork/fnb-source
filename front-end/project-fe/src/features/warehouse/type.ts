export interface IWarehouse {
  id: string;
  no: number;
  name: string;
  typeName: string;
  address: string;
  partnerWarehouseName?: string;
  partnerWarehouseId?: string;
  contactPerson?: string;
  contactPhone?: string;
  shopName?: string;
}

export interface IWarehouseListRequest {
  pageNumber?: number;
  pageSize?: number;
  keySearch?: string;
  type?: number;
  isLinkingPartner?: boolean;
  shopId?: string;
}

export interface ITypeDropDown {
  id: any;
  name: string;
}
