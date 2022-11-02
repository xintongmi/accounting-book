import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import {
  AccountBook,
  ApiEntitySegments,
  ListAccountBookResponse,
  ListPage,
} from '../data-types';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountBookService {
  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}

  getBookUrl(id?: number): Observable<string> {
    return this.accountService.getAccountBaseUrl$().pipe(
      map((accountBaseUrl) => {
        if (id) {
          return `${accountBaseUrl}/${ApiEntitySegments.BOOKS}/${id}`;
        }
        return `${accountBaseUrl}/${ApiEntitySegments.BOOKS}`;
      })
    );
  }

  getAccountBookList(): Observable<ListAccountBookResponse> {
    return this.getBookUrl().pipe(
      switchMap((booksUrl) => this.httpClient.get<Response>(booksUrl)),
      map((response): ListAccountBookResponse => {
        return {
          page: response.page,
          accountBooks: (response._embedded?.books ?? []).map((rawBook) => ({
            id: rawBook.id,
            name: rawBook.name,
          })),
        };
      })
    );
  }

  getAccountBook(bookId: number): Observable<ListAccountBookResponse> {
    return this.getBookUrl(bookId).pipe(
      switchMap((bookUrl) => this.httpClient.get<Response>(bookUrl)),
      map((response) => ({
        page: response.page,
        accountBooks: (response._embedded?.books ?? []).map((rawBook) => ({
          id: rawBook.id,
          name: rawBook.name,
        })),
      }))
    );
  }

  addBook(newBook: AccountBook) {
    return this.getBookUrl().pipe(
      switchMap((booksUrl) =>
        this.httpClient.post<AccountBook>(booksUrl, newBook)
      )
    );
  }

  updateBook(book: AccountBook) {
    return this.getBookUrl(book.id).pipe(
      switchMap((bookUrl) => this.httpClient.put<AccountBook>(bookUrl, book))
    );
  }

  deleteBook(book: AccountBook) {
    return this.getBookUrl(book.id).pipe(
      switchMap((bookUrl) => this.httpClient.delete(bookUrl))
    );
  }
}

declare interface RawAccountBook {
  id: number;
  name: string;
}

declare interface Response {
  page: ListPage;
  _embedded?: {
    books: RawAccountBook[];
  };
}
