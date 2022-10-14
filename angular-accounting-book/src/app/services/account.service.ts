import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../common/utils';
import { ApiEntitySegments } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  storage = sessionStorage;

  constructor(private httpClient: HttpClient) {}

  getAccountEmail(): string {
    return JSON.parse(this.storage.getItem('userEmail')!);
  }

  getAccountBaseUrl() {
    return `${getBackendBaseUrl()}/${
      ApiEntitySegments.ACCOUNTS
    }/${this.getAccountEmail()}`;
  }
}
