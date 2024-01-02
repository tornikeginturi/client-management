import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Account,
  AccountStatus,
  AccountStatusEnum,
  AccountType,
  AccountTypeEnum,
  Currency,
} from '../../store/types';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAccountFormComponent {
  @Input() accountStatuses: AccountStatus[];
  @Input() accountTypes: AccountType[];
  @Input() currencies: Currency[];

  @Input() clientId: number;

  @Output() addAccountEvent: EventEmitter<Account> =
    new EventEmitter<Account>();
  form = this._formBuilder.group({
    type: ['', Validators.required],
    currency: [[], Validators.required],
    accountNumber: ['', Validators.required],
    status: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder) {}

  onSubmit() {
    const account: Account = {
      accountNumber: this.form.value.accountNumber,
      type: this.form.value.type as AccountTypeEnum,
      currency: this.form.value.currency,
      status: this.form.value.status as AccountStatusEnum,
      id: null,
      clientId: this.clientId,
    };
    this.addAccountEvent.emit(account);
    this.form.reset(null);
  }
}
