import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getAccountBookUrl, getBackendBaseUrl } from '../common/utils';
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
    const fullListUrl = `${getAccountBookUrl(
      this.accountService.getAccountId(),
      bookId
    )}/${ApiEntitySegments.ITEMS}`;
    return this.getSpendingItem(fullListUrl);
  }
  filterSpendingItems(
    keyword: string,
    filterBy: string
  ): Observable<SpendingItem[]> {
    let searchUrl = '';
    if (filterBy === 'category') {
      searchUrl = `${getBackendBaseUrl()}/${
        ApiEntitySegments.ITEMS
      }/search/findByCategory?category=${keyword}`;
    } else {
      // filterBy === 'text'
      searchUrl = `${getBackendBaseUrl()}/${
        ApiEntitySegments.ITEMS
      }/search/findByText?text=${keyword}`;
      console.log(searchUrl);
    }
    return this.getSpendingItem(searchUrl);
  }
  getSpendingItem(url: string): Observable<SpendingItem[]> {
    return this.httpClient
      .get<GetResponse>(url)
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
