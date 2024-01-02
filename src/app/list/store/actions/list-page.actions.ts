import { createAction, props } from '@ngrx/store';
import {
  Account,
  Client,
  ClientFindInterface,
  ClientFindOneInterface,
} from '../types';

export const initialDataLoaded = createAction(
  '[List Page] Initial Data Loaded'
);

export const filterChanged = createAction(
  '[List Page] Filter Changed',
  props<{ payload: ClientFindInterface }>()
);

export const requestClientsData = createAction(
  '[List Page] Clients Data Requested',
  props<{ payload: ClientFindInterface }>()
);

export const selectedClientChanged = createAction(
  '[List Page] Selected Item Changed',
  props<{ payload: number }>()
);

export const clientSelected = createAction(
  '[List Page] Client Selected',
  props<{ payload: ClientFindOneInterface }>()
);

export const formSubmitted = createAction(
  '[List Card Component] Save Client Clicked',
  props<{ payload: Client }>()
);

export const removeClientClicked = createAction(
  '[Card Component] Remove Client Clicked',
  props<{ payload: number }>()
);

export const addNewClientClicked = createAction(
  '[Card Component] Add New Client Clicked',
  props<{ payload: number }>()
);

// create action name closeDrawerClicked
export const closeDrawerClicked = createAction(
  '[Card Component] Close Drawer Clicked'
);

export const addAccountClicked = createAction(
  '[Card Component] Add Account Clicked',
  props<{ payload: Account }>()
);

export const closeAccountClicked = createAction(
  '[Card Component] Close Account Clicked',
  props<{ payload: Account }>()
);
