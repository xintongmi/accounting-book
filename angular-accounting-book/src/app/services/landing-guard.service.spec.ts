import { TestBed } from '@angular/core/testing';

import { LandingGuardService } from './landing-guard.service';

describe('AuthGuardService', () => {
  let service: LandingGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
