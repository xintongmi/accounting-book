import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListAccountBookResponse, ListPage } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountUri() {
    // TODO(xintongTheCoder): Implement login.
    return 'http://localhost:8080/api/accounts/1';
  }

  setAccountUri(accountUri: string) {
    throw new Error('Not implemented');
  }
}
