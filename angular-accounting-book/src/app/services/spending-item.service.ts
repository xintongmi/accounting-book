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
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class SpendingItemService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly accountService: AccountService
  ) {}

  getUrl$(id: { bookId: number } | { itemId: number }): Observable<string> {
    return this.accountService.getAccountBaseUrl$().pipe(
      map((accountBaseUrl) => {
        if (this.hasBookId(id)) {
          return `${accountBaseUrl}/${ApiEntitySegments.BOOKS}/${id.bookId}/${ApiEntitySegments.ITEMS}`;
        }
        return `${accountBaseUrl}/${ApiEntitySegments.ITEMS}/${id.itemId}`;
      })
    );
  }

  private hasBookId(
    id: { bookId: number } | { itemId: number }
  ): id is { bookId: number } {
    return (id as { bookId: number }).bookId !== undefined;
  }

  getSpendingItemList$(
    bookId: number,
    pageIndex: number,
    pageSize: number,
    category: Category,
    text: string
  ): Observable<ListSpendingItemResponse> {
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
    return this.getUrl$({ bookId }).pipe(
      map((url) => `${url}?${suffix}`),
      switchMap((url) => this.httpClient.get<Response>(url)),
      map(
        (response): ListSpendingItemResponse => ({
          page: response.page,
          spendingItems: (response._embedded?.items ?? []).map((rawItem) => ({
            id: rawItem.id,
            category: rawItem.category,
            description: rawItem.description,
            merchant: rawItem.merchant,
            amount: rawItem.amount,
            date: rawItem.date,
            bookId: rawItem.bookId,
          })),
        })
      )
    );
  }

  addItem$(newItem: SpendingItem) {
    return this.getUrl$({ bookId: newItem.bookId }).pipe(
      switchMap((url) => this.httpClient.post<SpendingItem>(url, newItem))
    );
  }

  updateItem$(item: SpendingItem) {
    return this.getUrl$({ itemId: item.id }).pipe(
      switchMap((url) => this.httpClient.put<SpendingItem>(url, item))
    );
  }

  deleteItem$(item: SpendingItem) {
    return this.getUrl$({ itemId: item.id }).pipe(
      switchMap((url) => this.httpClient.delete(url))
    );
  }
}

declare interface RawSpendingItem {
  id: number;
  category: Category;
  description: string;
  merchant: string;
  amount: number;
  date: Date;
  bookId: number;
}

declare interface Response {
  _embedded?: {
    items: SpendingItem[];
  };
  page: ListPage;
}
