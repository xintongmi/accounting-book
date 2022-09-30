import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ListAccountBookResponse, ListPage } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class AccountBookService {
  private baseUrl = 'http://localhost:8080/api/accountBooks';

  constructor(private httpClient: HttpClient) {}

  getAccountBookList(accountUri: string): Observable<ListAccountBookResponse> {
    return this.httpClient.get<Response>(accountUri + '/accountBooks').pipe(
      map((response): ListAccountBookResponse => {
        return {
          page: response.page,
          accountBooks: response._embedded.accountBooks.map((rawBook) => ({
            uri: rawBook._links.self,
            name: rawBook.name,
          })),
        };
      })
    );
  }
}

declare interface RawAccountBook {
  name: string;
  _links: {
    self: string;
  };
}

declare interface Response {
  page: ListPage;
  _embedded: {
    accountBooks: RawAccountBook[];
  };
}
