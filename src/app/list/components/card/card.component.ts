import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Account,
  AccountStatus,
  AccountType,
  City,
  Client,
  Currency,
  Gender,
  GenderEnum,
} from '../../store/types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('500ms ease-in-out')),
    ]),
  ],
})
export class CardComponent implements OnChanges {
  @Input() client: Client;
  @Input() genders: Gender[];
  @Input() accountStatuses: AccountStatus[];
  @Input() accountTypes: AccountType[];
  @Input() currencies: Currency[];
  @Input() cities: City[];
  @Input() countries: City[];

  @Input() accounts: Account[];

  @Output() submitFormEvent: EventEmitter<Client> = new EventEmitter<Client>();
  @Output() closeDrawerEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addAccountEvent: EventEmitter<Account> =
    new EventEmitter<Account>();

  @Output() updateAccountEvent: EventEmitter<Account> =
    new EventEmitter<Account>();

  form = this.formBuilder.group({
    id: 0,
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^([ა-ჰ]+|[a-zA-Z]+)$/),
      ],
    ],
    surname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^([ა-ჰ]+|[a-zA-Z]+)$/),
      ],
    ],
    gender: '',
    personalNumber: ['', [Validators.required, Validators.minLength(11)]],
    mobile: [
      '',
      [Validators.required, Validators.minLength(9), Validators.pattern(/^5/)],
    ],
    legalAddress: this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    }),
    physicalAddress: this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    }),
    avatar: '',
  });

  showPhysicalAddressDetails = false;
  showLegalAddressDetails = false;
  showAddAccountFormDetails = false;
  showAccountInfoDetails = false;

  constructor(private formBuilder: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']) {
      console.log(this.client);
      this.form.reset(this.client as any);
    }
  }

  submitForm() {
    console.log(this.form);
    if (this.form.valid) {
      const client: Client = {
        name: this.form.value?.name,
        surname: this.form.value?.surname,
        mobile: this.form.value?.mobile,
        gender: this.form.value.gender as GenderEnum,
        personalNumber: this.form.value?.personalNumber,
        legalAddress: this.form.value?.legalAddress,
        physicalAddress: this.form.value?.physicalAddress,
        id: this.form.value?.id,
        avatar:
          this.form.value?.gender === GenderEnum.Female
            ? '../assets/images/female.png'
            : this.form.value?.gender === GenderEnum.Male
            ? '../assets/images/female.png'
            : null,
      };
      this.submitFormEvent.emit(client);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  closeForm() {
    this.closeDrawerEvent.emit();
  }

  showPhysicalAddress() {
    this.showPhysicalAddressDetails = !this.showPhysicalAddressDetails;
  }

  showLegalAddress() {
    this.showLegalAddressDetails = !this.showLegalAddressDetails;
  }

  showAddAccountForm() {
    this.showAddAccountFormDetails = !this.showAddAccountFormDetails;
  }

  showAccountInfo() {
    this.showAccountInfoDetails = !this.showAccountInfoDetails;
  }

  onAddAccountEvent(account: Account) {
    this.addAccountEvent.emit(account);
    this.showAddAccountFormDetails = false;
  }

  onUpdateItemEvent(account: Account) {
    this.updateAccountEvent.emit(account);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      this.showPhysicalAddressDetails = true;
      this.showLegalAddressDetails = true;

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
