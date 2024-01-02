import { AccountStatusEnum } from '../enums/account-status.enum';
import { AccountTypeEnum } from '../enums/account-type.enum';

export interface Account {
  id?: number;
  clientId: number;
  accountNumber: string;
  type: AccountTypeEnum;
  currency: string[];
  status: AccountStatusEnum;
}
