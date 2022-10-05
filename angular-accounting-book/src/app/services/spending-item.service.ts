import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAccountBookUrl, getBackendBaseUrl } from '../common/utils';
import {
  ApiEntitySegments,
  Category,
  ListPage,
  SpendingItem,
} from '../data-types';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class SpendingItemService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly accountService: AccountService
  ) {}

  getSpendingItemList(
    pageIndex: number,
    pageSize: number,
    bookId: number
  ): Observable<GetResponse> {
    const fullListUrl = `${getAccountBookUrl(
      this.accountService.getAccountId(),
      bookId
    )}/${ApiEntitySegments.ITEMS}?page=${pageIndex}&size=${pageSize}`;
    return this.httpClient.get<GetResponse>(fullListUrl);
  }

  filterSpendingItems(
    pageIndex: number,
    pageSize: number,
    keyword: Category,
    filterBy: string
  ): Observable<GetResponse> {
    let searchUrl = '';
    if (filterBy === 'category') {
      searchUrl = `${getBackendBaseUrl()}/${
        ApiEntitySegments.ITEMS
      }/search/findByCategory?category=${keyword}&page=${pageIndex}&size=${pageSize}`;
    } else {
      // filterBy === 'text'
      searchUrl = `${getBackendBaseUrl()}/${
        ApiEntitySegments.ITEMS
      }/search/findByText?text=${keyword}&page=${pageIndex}&size=${pageSize}`;
    }
    return this.httpClient.get<GetResponse>(searchUrl);
  }
}

declare interface RawSpendingItem {
  id: number;
}

declare interface GetResponse {
  _embedded: {
    spendingItems: SpendingItem[];
  };
  page: ListPage;
}
