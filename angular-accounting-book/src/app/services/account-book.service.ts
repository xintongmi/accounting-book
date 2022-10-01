import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getAccountUrl } from '../common/utils';
import { ListAccountBookResponse, ListPage } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class AccountBookService {
  constructor(private httpClient: HttpClient) {}

  getAccountBookList(accountId: number): Observable<ListAccountBookResponse> {
    const accountUrl = getAccountUrl(accountId);
    return this.httpClient.get<Response>(accountUrl).pipe(
      map((response): ListAccountBookResponse => {
        return {
          page: response.page,
          accountBooks: response._embedded.accountBooks.map((rawBook) => ({
            id: rawBook.id,
            name: rawBook.name,
          })),
        };
      })
    );
  }
}

declare interface RawAccountBook {
  id: number;
  name: string;
}

declare interface Response {
  page: ListPage;
  _embedded: {
    accountBooks: RawAccountBook[];
  };
}
