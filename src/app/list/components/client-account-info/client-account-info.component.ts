import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { keyBy } from 'lodash';
import {
  Account,
  AccountStatus,
  AccountStatusEnum,
  AccountType,
  Currency,
} from '../../store/types';

@Component({
  selector: 'app-client-account-info',
  templateUrl: './client-account-info.component.html',
  styleUrls: ['./client-account-info.component.scss'],
})
export class ClientAccountInfoComponent implements OnChanges {
  @Input() accounts: Account[];
  @Input() accountStatuses: AccountStatus[];
  @Input() accountTypes: AccountType[];
  @Input() currencies: Currency[];

  @Output() updateItemEvent: EventEmitter<Account> =
    new EventEmitter<Account>();

  statusEnum = AccountStatusEnum;

  accountStatusMap: { [key: string]: AccountStatus } = {};
  accountTypesMap: { [key: string]: AccountType } = {};
  currenciesMap: { [key: string]: Currency } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountStatuses']) {
      this.accountStatusMap = keyBy(this.accountStatuses, 'key');
    }

    if (changes['accountTypes']) {
      this.accountTypesMap = keyBy(this.accountTypes, 'key');
    }

    if (changes['currencies']) {
      this.currenciesMap = keyBy(this.currencies, 'key');
    }
  }

  updateItem(account: Account) {
    this.updateItemEvent.emit({
      ...account,
      status: AccountStatusEnum.Inactive,
    });
  }
}
