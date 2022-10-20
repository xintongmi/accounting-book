import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import {
  ApiEntitySegments,
  Category,
  ListPage,
  ListSpendingItemResponse,
  SpendingItem,
} from '../data-types';
import { AccountBookService } from './account-book.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class SpendingItemService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly accountService: AccountService
  ) {}

  getUrl(ids: { bookId?: number; itemId?: number }): Observable<string> {
    return this.accountService.getAccountBaseUrl().pipe(
      map((accountBaseUrl) => {
        if (ids.bookId) {
          return `${accountBaseUrl}/${ApiEntitySegments.BOOKS}/${ids.bookId}/${ApiEntitySegments.ITEMS}`;
        }
        if (ids.itemId) {
          return `${accountBaseUrl}/${ApiEntitySegments.ITEMS}/${ids.itemId}`;
        }
        throw new Error('Missing ids');
      })
    );
  }

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
    const suffix = params.join('&');
    return this.getUrl({ bookId }).pipe(
      map((url) => `${url}?${suffix}`),
      switchMap((url) => this.httpClient.get<Response>(url)),
      map((response) => ({
        spendingItems: response._embedded?.items ?? [],
        page: response.page,
      }))
    );
  }

  addItem(newItem: SpendingItem) {
    return this.getUrl({ bookId: newItem.bookId }).pipe(
      switchMap((url) => this.httpClient.post<SpendingItem>(url, newItem))
    );
  }

  updateItem(item: SpendingItem) {
    return this.getUrl({ itemId: item.id }).pipe(
      switchMap((url) => this.httpClient.put<SpendingItem>(url, item))
    );
  }

  deleteItem(item: SpendingItem) {
    return this.getUrl({ itemId: item.id }).pipe(
      switchMap((url) => this.httpClient.delete(url))
    );
  }
}

declare interface Response {
  _embedded?: {
    items: SpendingItem[];
  };
  page: ListPage;
}
