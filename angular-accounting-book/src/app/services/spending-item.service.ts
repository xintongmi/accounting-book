import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  private booksUrl = `${this.accountService.getAccountBaseUrl()}/${
    ApiEntitySegments.BOOKS
  }`;
  private itemsUrl = `${this.accountService.getAccountBaseUrl()}/${
    ApiEntitySegments.ITEMS
  }`;
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
    const suffix = params.join('&');
    searchUrl = `${this.booksUrl}/${bookId}/${ApiEntitySegments.ITEMS}?${suffix}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map((response) => {
        return {
          spendingItems: response._embedded?.items ?? [],
          page: response.page,
        };
      })
    );
  }

  addItem(newItem: SpendingItem) {
    const url = `${this.booksUrl}/${newItem.bookId}/${ApiEntitySegments.ITEMS}`;
    return this.httpClient.post<SpendingItem>(url, newItem);
  }

  updateItem(item: SpendingItem) {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.httpClient.put<SpendingItem>(url, item);
  }

  deleteItem(item: SpendingItem) {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.httpClient.delete(url);
  }
}

declare interface GetResponse {
  _embedded?: {
    items: SpendingItem[];
  };
  page: ListPage;
}
