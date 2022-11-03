import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SpendingItem } from '../data-types';
import { AccountService } from './account.service';

import { SpendingItemService } from './spending-item.service';

fdescribe('SpendingItemService', () => {
  let service: SpendingItemService;
  let mockAccountService: any;
  let mockHttpClient: any;

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

  // it('#getSpendingItemList should return correct spendingItemResponse', (done: DoneFn) => {});

  it('#addItem should return correct spendingItem', (done: DoneFn) => {
    const date = new Date();
    const newItem: SpendingItem = {
      id: 0,
      bookId: 1,
      category: 'household',
      description: 'desc',
      amount: 2,
      date,
      merchant: 'mer',
    };
    const result$ = service.addItem(newItem);
    result$.subscribe((v) => {
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        'baseUrl/books/1/items',
        newItem
      );
      done();
    });
  });
});
