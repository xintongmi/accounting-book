import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from './account.service';

import { SpendingItemService } from './spending-item.service';

fdescribe('SpendingItemService', () => {
  let service: SpendingItemService;

  beforeEach(() => {
    const mockHttpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete',
    ]);
    const mockAccountService = jasmine.createSpyObj('AccountService', [
      'getAccountBaseUrl$',
    ]);
    mockAccountService.getAccountBaseUrl$.and.returnValue(of('baseUrl'));

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
});
