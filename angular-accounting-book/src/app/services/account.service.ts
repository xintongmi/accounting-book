import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountId() {
    // TODO(xintongTheCoder): Implement login.
    return 1;
  }

  setAccountId(accountId: number) {
    throw new Error('Not implemented');
  }
}
