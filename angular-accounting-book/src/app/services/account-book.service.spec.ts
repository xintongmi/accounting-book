import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountBook } from '../data-types';
import { AccountBookService } from './account-book.service';
import { AccountService } from './account.service';

describe('AccountBookService', () => {
  let service: AccountBookService;
  let mockHttpClient: any;
  let mockAccountService: any;

  const newBook: AccountBook = {
    id: 1,
    name: 'book1',
  };

  const mockResp = {
    _embedded: {
      books: [
        {
          id: 1,
          name: 'book1',
          _links: {
            self: {
              href: 'someLink',
              templated: true,
            },
            books: {
              href: 'someLink',
              templated: true,
            },
          },
        },
      ],
    },
    _links: {
      self: {
        href: 'someLink',
      },
    },
    page: {
      size: 10,
      totalElements: 1,
      totalPages: 1,
      number: 0,
    },
  };

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete',
    ]);
    mockAccountService = jasmine.createSpyObj('AccountService', [
      'getAccountBaseUrl$',
    ]);

    mockAccountService.getAccountBaseUrl$.and.returnValue(of('baseUrl'));
    mockHttpClient.get.and.returnValue(of(''));
    mockHttpClient.put.and.returnValue(of(''));
    mockHttpClient.post.and.returnValue(of(''));
    mockHttpClient.delete.and.returnValue(of(''));

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: AccountService, useValue: mockAccountService },
        AccountBookService,
      ],
    });
    service = TestBed.inject(AccountBookService);
  });

  it('#getBookUrl with bookId should return correct url', (done: DoneFn) => {
    const result$ = service.getBookUrl$(1);
    result$.subscribe((v) => {
      expect(v).toEqual('baseUrl/books/1');
      done();
    });
  });

  it('#getBookUrl without bookId should return correct url', (done: DoneFn) => {
    const result$ = service.getBookUrl$();
    result$.subscribe((v) => {
      expect(v).toEqual('baseUrl/books');
      done();
    });
  });

  it('#getAccountBookList should send correct request and return correct response', (done: DoneFn) => {
    mockHttpClient.get.and.returnValue(of(mockResp));
    const booksUrl = 'baseUrl/books';
    const result$ = service.getAccountBookList$();
    result$.subscribe((v) => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(booksUrl);
      expect(v).toEqual({
        page: {
          size: 10,
          totalElements: 1,
          totalPages: 1,
          number: 0,
        },
        accountBooks: [
          {
            id: 1,
            name: 'book1',
          },
        ],
      });
      done();
    });
  });

  it('#getAccountBook should send correct request and return correct response', (done: DoneFn) => {
    mockHttpClient.get.and.returnValue(of(mockResp));
    const booksUrl = 'baseUrl/books/1';
    const result$ = service.getAccountBook$(1);
    result$.subscribe((v) => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(booksUrl);
      expect(v).toEqual({
        page: {
          size: 10,
          totalElements: 1,
          totalPages: 1,
          number: 0,
        },
        accountBooks: [
          {
            id: 1,
            name: 'book1',
          },
        ],
      });
      done();
    });
  });

  it('#addBook should send correct request', (done: DoneFn) => {
    const result$ = service.addBook$(newBook);
    result$.subscribe((v) => {
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        'baseUrl/books',
        newBook
      );
      done();
    });
  });

  it('#updateBook should send correct request', (done: DoneFn) => {
    const result$ = service.updateBook$(newBook);
    result$.subscribe((v) => {
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        'baseUrl/books/1',
        newBook
      );
      done();
    });
  });

  it('#deleteBook should send correct request', (done: DoneFn) => {
    const result$ = service.deleteBook$(newBook);
    result$.subscribe((v) => {
      expect(mockHttpClient.delete).toHaveBeenCalledWith('baseUrl/books/1');
      done();
    });
  });
});
