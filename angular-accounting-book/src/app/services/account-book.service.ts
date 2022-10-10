import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getBackendBaseUrl } from '../common/utils';
import {
  ApiEntitySegments,
  ListAccountBookResponse,
  ListPage,
} from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class AccountBookService {
  constructor(private httpClient: HttpClient) {}

  getAccountBookList(): Observable<ListAccountBookResponse> {
    const booksUrl = `${getBackendBaseUrl()}/${ApiEntitySegments.BOOKS}`;
    return this.httpClient.get<Response>(booksUrl).pipe(
      map((response): ListAccountBookResponse => {
        return {
          page: response.page,
          accountBooks: response._embedded.books.map((rawBook) => ({
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
    books: RawAccountBook[];
  };
}
