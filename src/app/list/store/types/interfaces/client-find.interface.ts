export interface ClientFindInterface {
  query: string;
  pageIndex: number;
  pageSize: number;
  sortBy: ClientSortFieldEnum;
  sortDirection: ClientSortDirectionEnum;
}

export enum ClientSortFieldEnum {
  id = 'id',
  Name = 'name',
  Surname = 'surname',
  PID = 'personalId',
  City = 'city',
  Country = 'country',
  Address = 'address',
  Mobile = 'mobile',
}

export enum ClientSortDirectionEnum {
  Asc = 'asc',
  Desc = 'desc',
}
