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
    bookId: number,
    pageIndex: number,
    pageSize: number,
    category: Category,
    text: string
  ): Observable<ListSpendingItemResponse> {
    let searchUrl = '';
    const params = [];
    params.push(`page=${pageIndex}`);
    params.push(`size=${pageSize}`);
    if (category !== Category.ALL) {
      params.push(`category=${category}`);
    }
    if (text) {
      params.push(`text=${text}`);
    }
    // TODO
    const suffix = params.join('&');
    searchUrl = `${getBackendBaseUrl()}/${ApiEntitySegments.BOOKS}/${bookId}/${
      ApiEntitySegments.ITEMS
    }?${suffix}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map((response) => {
        return {
          spendingItems: response._embedded?.items ?? [],
          page: response.page,
        };
      })
    );
  }

  WriteItem(newItem: SpendingItem) {
    const WriteItemUrl = `${getBackendBaseUrl()}/${ApiEntitySegments.BOOKS}/${
      newItem.bookId
    }/${ApiEntitySegments.ITEMS}`;
    return this.httpClient.post<SpendingItem>(WriteItemUrl, newItem);
  }
}

declare interface GetResponse {
  _embedded?: {
    items: SpendingItem[];
  };
  page: ListPage;
}
