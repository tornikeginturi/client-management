import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, accountAdapter, clientAdapter } from '../state';

const { selectAll: entitiesSelectAllClients } = clientAdapter.getSelectors();
const { selectAll: entitiesSelectAllAccounts } = accountAdapter.getSelectors();
export const state = createFeatureSelector<State>('client');

export const selectClients = createSelector(state, (state: State) => {
  const data = entitiesSelectAllClients(state.clients);
  return {
    data: data,
    total: state.total,
  };
});

export const selectSelectedClient = createSelector(state, (state: State) => {
  return state.selectedClient;
});

export const selectSelectedClientId = createSelector(state, (state: State) => {
  return state.selectedClientId;
});

export const selectAccountTypes = createSelector(
  state,
  (state: State) => state.accountTypes
);

export const selectClientAccounts = createSelector(state, (state: State) => {
  return entitiesSelectAllAccounts(state.accounts);
});

export const selectAccountStatuses = createSelector(
  state,
  (state: State) => state.accountStatuses
);

export const selectGenders = createSelector(
  state,
  (state: State) => state.genders
);

export const selectCurrencies = createSelector(
  state,
  (state: State) => state.currencies
);

export const selectCities = createSelector(
  state,
  (state: State) => state.cities
);
export const selectLoadingStatus = createSelector(
  state,
  (state: State) => state.loading
);

export const selectCountries = createSelector(
  state,
  (state: State) => state.countries
);
