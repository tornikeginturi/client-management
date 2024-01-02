import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  Account,
  AccountStatus,
  AccountType,
  City,
  Client,
  Currency,
  Gender,
} from '../types';

export interface State {
  loading: boolean;
  genders: Gender[];

  clients: EntityState<Client>;
  total: number;

  cities: City[];

  accounts: EntityState<Account>;
  countries: any[];

  currencies: Currency[];

  selectedClient: Client;
  selectedClientId: number | null;

  accountTypes: AccountType[];

  accountStatuses: AccountStatus[];
}

export const clientAdapter: EntityAdapter<Client> =
  createEntityAdapter<Client>();
export const accountAdapter: EntityAdapter<Account> =
  createEntityAdapter<Account>();
