import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  private readonly booksUrl = `${this.accountService.getAccountBaseUrl()}/${
    ApiEntitySegments.BOOKS
  }`;
  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
  ) {}

  getAccountBookList(): Observable<ListAccountBookResponse> {
    return this.httpClient.get<Response>(this.booksUrl).pipe(
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

  getAccountBook(bookId: number): Observable<ListAccountBookResponse> {
    return this.httpClient.get<Response>(`${this.booksUrl}/${bookId}`).pipe(
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

  addBook(newBook: AccountBook) {
    return this.httpClient.post<AccountBook>(this.booksUrl, newBook);
  }

  updateBook(book: AccountBook) {
    const url = `${this.accountService.getAccountBaseUrl()}/${
      ApiEntitySegments.BOOKS
    }/${book.id}`;
    return this.httpClient.put<AccountBook>(url, book);
  }

  deleteBook(book: AccountBook) {
    const url = `${this.accountService.getAccountBaseUrl()}/${
      ApiEntitySegments.BOOKS
    }/${book.id}`;
    return this.httpClient.delete(url);
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
