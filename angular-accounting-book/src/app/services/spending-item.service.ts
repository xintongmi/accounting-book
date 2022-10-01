import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getAccountBookUrl } from '../common/utils';
import { ApiEntitySegments, SpendingItem } from '../data-types';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class SpendingItemService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly accountService: AccountService
  ) {}

  getSpendingItemList(bookId: number): Observable<SpendingItem[]> {
    return this.httpClient
      .get<GetResponse>(
        `${getAccountBookUrl(this.accountService.getAccountId(), bookId)}/${
          ApiEntitySegments.ITEMS
        }`
      )
      .pipe(map((response) => response._embedded.spendingItems));
  }
}

declare interface RawSpendingItem {
  id: number;
}

declare interface GetResponse {
  _embedded: {
    spendingItems: SpendingItem[];
  };
}
