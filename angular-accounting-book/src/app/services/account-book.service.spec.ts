import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AccountBookService } from './account-book.service';
import { AccountService } from './account.service';

describe('AccountBookService', () => {
  let service: AccountBookService;
  let mockHttpClient: any;
  let mockAccountService: any;

  const mockResp = {
    _embedded: {
      books: [
        {
          id: 7,
          name: 'Test',
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
        accountBooks: [
          Object({
            id: 7,
            name: 'Test',
          }),
        ],
        page: Object({
          size: 10,
          totalElements: 1,
          totalPages: 1,
          number: 0,
        }),
      });
      done();
    });
  });
});
