import { createReducer, on } from '@ngrx/store';
import { ApiActions, ListPageActions } from '../actions';
import { State, accountAdapter, clientAdapter } from '../state';

export const initialState: State = {
  accountStatuses: [],
  accountTypes: [],
  loading: false,
  cities: [],
  currencies: [],
  genders: [],
  countries: [],
  selectedClient: null,
  total: 0,
  selectedClientId: null,
  clients: {
    ids: [],
    entities: {},
  },
  accounts: {
    ids: [],
    entities: {},
  },
};

export const reducer = createReducer(
  initialState,

  on(ListPageActions.closeDrawerClicked, (state): State => {
    return {
      ...state,
      selectedClient: null,
      selectedClientId: null,
    };
  }),

  on(ListPageActions.addNewClientClicked, (state): State => {
    return { ...state, selectedClient: null, selectedClientId: 0 };
  }),

  on(ListPageActions.requestClientsData, (state): State => {
    console.log('object');
    return { ...state, loading: true };
  }),

  on(
    ApiActions.initialDataLoadedSuccess,
    (
      state,
      { accountStatuses, accountTypes, cities, currencies, genders, countries }
    ): State => {
      console.log('object');

      return {
        ...state,
        loading: false,
        cities: cities,
        accountStatuses: accountStatuses,
        currencies: currencies,
        accountTypes: accountTypes,
        genders: genders,
        countries: countries,
      };
    }
  ),

  on(ApiActions.findSuccess, (state, { data, total }): State => {
    console.log('object');

    return {
      ...state,
      clients: clientAdapter.setAll(data, state.clients),
      total: total,
      loading: false,
    };
  }),

  on(ListPageActions.clientSelected, (state, { payload }): State => {
    return { ...state, selectedClientId: payload.id };
  }),

  on(ApiActions.addAccountSuccess, (state, { account }): State => {
    console.log('object');

    return {
      ...state,
      accounts: accountAdapter.upsertOne(account, state.accounts),
      loading: false,
    };
  }),

  on(ApiActions.findOneSuccess, (state, { data, accounts }): State => {
    console.log('object');

    return {
      ...state,
      loading: false,
      selectedClient: data,
      accounts: accountAdapter.setAll(accounts, state.accounts),
    };
  }),

  on(ListPageActions.formSubmitted, (state): State => {
    console.log('object');

    return { ...state, loading: true };
  }),

  on(ApiActions.saveSuccess, (state, { data }): State => {
    console.log('object');

    return {
      ...state,
      clients: clientAdapter.upsertOne(data, state.clients),
      loading: false,
    };
  }),

  on(ListPageActions.removeClientClicked, (state): State => {
    console.log('object');

    return { ...state, loading: true };
  }),

  on(ApiActions.removeSuccess, (state, { id }): State => {
    console.log('object');

    return {
      ...state,
      clients: clientAdapter.removeOne(id, state.clients),
      loading: false,
    };
  }),

  on(ListPageActions.closeAccountClicked, (state): State => {
    console.log('object');

    return { ...state, loading: true };
  }),

  on(ApiActions.closeAccountSuccess, (state, { account }): State => {
    console.log('object');

    return {
      ...state,
      accounts: accountAdapter.upsertOne(account, state.accounts),
      loading: false,
    };
  })
);
