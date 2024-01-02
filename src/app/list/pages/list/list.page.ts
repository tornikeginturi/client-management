import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  DialogCloseResult,
  DialogService,
} from '@progress/kendo-angular-dialog';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { isEqual } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { ListPageActions } from '../../store/actions';
import { ClientSelectors } from '../../store/selectors';
import {
  Account,
  Client,
  ClientFindInterface,
  ClientSortDirectionEnum,
  ClientSortFieldEnum,
  DialogEnum,
} from '../../store/types';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  selectedClient$ = this.store.select(ClientSelectors.selectSelectedClient);
  clients$ = this.store.select(ClientSelectors.selectClients);
  selectedClientId$ = this.store.select(ClientSelectors.selectSelectedClientId);

  accountTypes$ = this.store.select(ClientSelectors.selectAccountTypes);
  accountStatuses$ = this.store.select(ClientSelectors.selectAccountStatuses);
  genders$ = this.store.select(ClientSelectors.selectGenders);
  currencies$ = this.store.select(ClientSelectors.selectCurrencies);
  cities$ = this.store.select(ClientSelectors.selectCities);
  countries$ = this.store.select(ClientSelectors.selectCountries);

  clientAccounts$ = this.store.select(ClientSelectors.selectClientAccounts);

  loading$ = this.store.select(ClientSelectors.selectLoadingStatus);

  filterOptions: ClientFindInterface;
  state = { skip: 0, take: 5 };

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (query['id']) {
        this.store.dispatch(
          ListPageActions.clientSelected({ payload: { id: +query['id'] } })
        );
      }

      let localFilterOptions: ClientFindInterface = {
        query: query?.['query'] || '',
        pageIndex: query?.['pageIndex'] || 0,
        pageSize: query?.['pageSize'] || 5,
        sortBy: query?.['sortBy'] || ClientSortFieldEnum.id,
        sortDirection: query?.['sortDirection'] || ClientSortDirectionEnum.Asc,
      };

      if (!isEqual(localFilterOptions, this.filterOptions)) {
        this.filterOptions = localFilterOptions;
        this.store.dispatch(
          ListPageActions.requestClientsData({
            payload: this.filterOptions,
          })
        );
      }
    });
  }

  editItem(client: Client) {
    console.log(client.id);
    console.log(typeof client.id);
    this.store.dispatch(
      ListPageActions.selectedClientChanged({ payload: client.id })
    );
  }

  async removeItem(client: Client) {
    const dialog = this.dialogService.open({
      title: 'Remove Client',
      content: 'Are you sure you want to remove this client',
      actions: [
        { text: DialogEnum.Cancel },
        { text: DialogEnum.Confirm, themeColor: 'primary' },
      ],
    });

    const result = await lastValueFrom(dialog.result);

    if (result instanceof DialogCloseResult) {
      dialog.close();
    } else {
      const { text } = result;
      if (text === DialogEnum.Confirm) {
        this.store.dispatch(
          ListPageActions.removeClientClicked({ payload: client.id })
        );
      }
    }
  }

  onFilter(event: any) {
    this.store.dispatch(
      ListPageActions.filterChanged({
        payload: { ...this.filterOptions, query: event },
      })
    );
  }

  addNewClient() {
    this.store.dispatch(ListPageActions.addNewClientClicked({ payload: 0 }));
  }

  sortChange(event: SortDescriptor[]) {
    console.log(event);
    this.store.dispatch(
      ListPageActions.filterChanged({
        payload: {
          ...this.filterOptions,
          sortBy: event?.[0].field as ClientSortFieldEnum,
          sortDirection: event?.[0].dir as ClientSortDirectionEnum,
        },
      })
    );
  }

  pageChange(event: PageChangeEvent) {
    this.state = event;
    this.filterOptions = {
      ...this.filterOptions,
      pageIndex: event.skip,
      pageSize: event.take,
    };

    this.store.dispatch(
      ListPageActions.filterChanged({
        payload: this.filterOptions,
      })
    );
  }

  onCloseDrawerEvent() {
    this.store.dispatch(ListPageActions.closeDrawerClicked());
  }

  onSubmitFormEvent(client: Client) {
    this.store.dispatch(ListPageActions.formSubmitted({ payload: client }));
  }

  onAddAccountEvent(account: Account) {
    this.store.dispatch(
      ListPageActions.addAccountClicked({ payload: account })
    );
  }

  async onUpdateAccountEvent(account: Account) {
    const dialog = this.dialogService.open({
      title: 'Close Client Account',
      content: 'Are you sure you want to close this account',
      actions: [
        { text: DialogEnum.Cancel },
        { text: DialogEnum.Confirm, themeColor: 'primary' },
      ],
    });

    const result = await lastValueFrom(dialog.result);

    if (result instanceof DialogCloseResult) {
      dialog.close();
    } else {
      const { text } = result;
      if (text === DialogEnum.Confirm) {
        this.store.dispatch(
          ListPageActions.closeAccountClicked({ payload: account })
        );
      }
    }
  }
}
