import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getBackendBaseUrl } from '../common/utils';
import {
  ApiEntitySegments,
  Category,
  ListPage,
  ListSpendingItemResponse,
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
    const fullListUrl = `${getBackendBaseUrl()}/${
      ApiEntitySegments.BOOKS
    }/${bookId}/${ApiEntitySegments.ITEMS}`;
    return this.httpClient.get<GetResponse>(fullListUrl);
  }

  filterSpendingItems(
    pageIndex: number,
    pageSize: number,
    category: Category,
    filterText: string
  ): Observable<ListSpendingItemResponse> {
    let searchUrl = '';
    const params = [];
    if (category !== Category.All) {
      params.push(`category=${category}`);
    }
    if (filterText) {
      params.push(`filter=${filterText}`);
    }
    params.push(`page=${pageIndex}`);
    params.push(`size=${pageSize}`);
    // TODO
    const suffix = params.join('&');
    if (filterText === 'category') {
      searchUrl = `${getBackendBaseUrl()}/${
        ApiEntitySegments.ITEMS
      }/search/findByCategory?category=${category}&page=${pageIndex}&size=${pageSize}`;
    } else {
      // filterBy === 'text'
      searchUrl = `${getBackendBaseUrl()}/${
        ApiEntitySegments.ITEMS
      }/search/findByText?text=${category}&page=${pageIndex}&size=${pageSize}`;
    }
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map((resp) => {
        return {
          spendingItems: resp._embedded.items,
        };
      })
    );
  }
}

declare interface GetResponse {
  _embedded: {
    items: SpendingItem[];
  };
  page: ListPage;
}
