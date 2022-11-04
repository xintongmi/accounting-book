import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Category, SpendingItem } from '../data-types';
import { AccountService } from './account.service';

import { SpendingItemService } from './spending-item.service';

fdescribe('SpendingItemService', () => {
  let service: SpendingItemService;
  let mockAccountService: any;
  let mockHttpClient: any;

  const date = new Date();
  const newItem: SpendingItem = {
    id: 0,
    category: Category.GROCERY,
    description: 'desc',
    merchant: 'merchant',
    amount: 2,
    date,
    bookId: 1,
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
        SpendingItemService,
      ],
    });
    service = TestBed.inject(SpendingItemService);
  });

  it('#getUrl with bookId should return correct url', (done: DoneFn) => {
    const result$ = service.getUrl({ bookId: 1 });
    result$.subscribe((v) => {
      expect(v).toEqual('baseUrl/books/1/items');
      done();
    });
  });

  it('#getUrl with itemId should return correct url', (done: DoneFn) => {
    const result$ = service.getUrl({ itemId: 1 });
    result$.subscribe((v) => {
      expect(v).toEqual('baseUrl/items/1');
      done();
    });
  });

  it('#getSpendingItemList should send correct request', (done: DoneFn) => {
    const mockResp = {
      _embedded: {
        items: [
          {
            id: 204,
            category: 'GROCERY',
            description: 'Grocery',
            merchant: 'Safeway',
            date: '2022-10-03',
            amount: 12,
            _links: {
              self: {
                href: 'somelink',
                templated: true,
              },
              items: {
                href: 'somelink',
                templated: true,
              },
            },
          },
        ],
      },
      _links: {
        self: {
          href: 'somelink',
        },
      },
      page: {
        size: 10,
        totalElements: 1,
        totalPages: 1,
        number: 0,
      },
    };
    mockHttpClient.get.and.returnValue(of(mockResp));
    const result$ = service.getSpendingItemList(
      1,
      0,
      10,
      Category.HOUSEHOLD,
      'food'
    );
    result$.subscribe((v) => {
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'baseUrl/books/1/items?page=0&size=10&category=HOUSEHOLD&text=food'
      );
      expect(v).toEqual({
        spendingItems: [
          Object({
            id: 204,
            category: 'GROCERY',
            description: 'Grocery',
            merchant: 'Safeway',
            date: '2022-10-03',
            amount: 12,
            _links: Object({
              self: Object({ href: 'somelink', templated: true }),
              items: Object({ href: 'somelink', templated: true }),
            }),
          }),
        ],
        page: Object({ size: 10, totalElements: 1, totalPages: 1, number: 0 }),
      });
      done();
    });
  });

  it('#addItem should send correct request', (done: DoneFn) => {
    const result$ = service.addItem(newItem);
    result$.subscribe((v) => {
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        'baseUrl/books/1/items',
        newItem
      );
      done();
    });
  });

  it('#updateItem should send correct request', (done: DoneFn) => {
    const result$ = service.updateItem(newItem);
    result$.subscribe((v) => {
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        'baseUrl/items/0',
        newItem
      );
      done();
    });
  });

  it('#deleteItem should send correct request', (done: DoneFn) => {
    const result$ = service.deleteItem(newItem);
    result$.subscribe((v) => {
      expect(mockHttpClient.delete).toHaveBeenCalledWith('baseUrl/items/0');
      done();
    });
  });
});
