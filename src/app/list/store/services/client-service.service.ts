import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Account,
  AccountStatus,
  AccountType,
  City,
  Client,
  ClientFindInterface,
  ClientFindOneInterface,
  Currency,
  Gender,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  find(
    payload: ClientFindInterface
  ): Observable<{ data: Client[]; total: number }> {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(payload)) {
      // Check the type of the property before appending
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        params = params.append(key, value.toString());
      }
    }
    return this.httpClient.get<{ data: Client[]; total: number }>(
      `${environment.apiUrl}/clients`,
      {
        params: params,
      }
    );
  }

  findOne(payload: ClientFindOneInterface): Observable<Client> {
    return this.httpClient.get<Client>(
      `${environment.apiUrl}/clients/${payload.id}`
    );
  }

  update(payload: Client): Observable<Client> {
    console.log(payload);
    return this.httpClient.put<Client>(
      `${environment.apiUrl}/clients`,
      payload
    );
  }

  add(payload: Client): Observable<Client> {
    console.log(payload);
    return this.httpClient.post<Client>(
      `${environment.apiUrl}clients`,
      payload
    );
  }

  remove(payload: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${environment.apiUrl}/clients/${payload}`
    );
  }

  genders(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(`${environment.apiUrl}/genders`);
  }

  accountTypes(): Observable<AccountType[]> {
    return this.httpClient.get<AccountType[]>(
      `${environment.apiUrl}/accountTypes`
    );
  }

  accountStatuses(): Observable<AccountStatus[]> {
    return this.httpClient.get<AccountStatus[]>(
      `${environment.apiUrl}/accountStatuses`
    );
  }

  cities(): Observable<City[]> {
    return this.httpClient.get<City[]>(`${environment.apiUrl}/cities`);
  }

  currencies(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(`${environment.apiUrl}/currencies`);
  }

  countries(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/countries`);
  }

  accounts(id: number): Observable<Account[]> {
    return this.httpClient.get<Account[]>(
      `${environment.apiUrl}/accounts/${id}`
    );
  }

  addAccount(payload: Account): Observable<Account> {
    return this.httpClient.post<Account>(
      `${environment.apiUrl}/accounts`,
      payload
    );
  }

  closeAccount(payload: Account): Observable<Account> {
    return this.httpClient.put<Account>(
      `${environment.apiUrl}/accounts`,
      payload
    );
  }
}
