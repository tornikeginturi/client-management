import { createAction, props } from '@ngrx/store';
import {
  Account,
  AccountStatus,
  AccountType,
  City,
  Client,
  Currency,
  Gender,
} from '../types';

export const findSuccess = createAction(
  '[Client Api] Find Success',
  props<{ data: Client[]; total: number }>()
);

export const findOneSuccess = createAction(
  '[Client Api] Find One Success',
  props<{ data: Client; accounts: Account[] }>()
);

export const saveSuccess = createAction(
  '[Client Api] Save Success',
  props<{ data: Client }>()
);

export const removeSuccess = createAction(
  '[Client Api] Remove Success',
  props<{ id: number }>()
);

export const initialDataLoadedSuccess = createAction(
  'Client Api] Initial Data Loaded Success',
  props<{
    genders: Gender[];
    accountTypes: AccountType[];
    accountStatuses: AccountStatus[];
    currencies: Currency[];
    cities: City[];
    countries: any[];
  }>()
);

export const addAccountSuccess = createAction(
  '[Client Api] Add Account Success',
  props<{ account: Account }>()
);

export const closeAccountSuccess = createAction(
  '[Client Api] Update Account Success',
  props<{ account: Account }>()
);
