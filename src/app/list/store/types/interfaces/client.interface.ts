import { GenderEnum } from '../enums/gender.enum';
import { Address } from './address.interface';

export interface Client {
  id?: number;
  name: string;
  surname: string;
  gender: GenderEnum;
  personalNumber: string;
  mobile: string;
  legalAddress: Address;
  physicalAddress: Address;
  avatar: string;
}
