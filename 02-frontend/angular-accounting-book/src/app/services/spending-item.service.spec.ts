import { TestBed } from '@angular/core/testing';

import { SpendingItemService } from './spending-item.service';

describe('SpendingItemService', () => {
  let service: SpendingItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendingItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
