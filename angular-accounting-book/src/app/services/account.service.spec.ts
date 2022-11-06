import { TestBed } from '@angular/core/testing';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, UserClaims } from '@okta/okta-auth-js';
import { of } from 'rxjs';
import { AccountService } from './account.service';

describe('AuthInterceptorService', () => {
  let service: AccountService;
  let mockOktaAuth: any;
  let mockOktaAuthService: any;

  const userClaim: UserClaims = {
    email: 'email',
    name: 'name',
    sub: 'sub',
  };

  const authState: AuthState = {
    isAuthenticated: true,
  };

  beforeEach(() => {
    mockOktaAuth = jasmine.createSpyObj('OKTA_AUTH', ['getUser']);
    mockOktaAuthService = jasmine.createSpyObj('OktaAuthStateService', [
      'placeholder',
    ]);
    mockOktaAuthService.authState$ = of(authState);

    mockOktaAuth.getUser.and.returnValue(Promise.resolve(userClaim));

    TestBed.configureTestingModule({
      providers: [
        { provide: OKTA_AUTH, useValue: mockOktaAuth },
        { provide: OktaAuthStateService, useValue: mockOktaAuthService },
        AccountService,
      ],
    });
    service = TestBed.inject(AccountService);
  });

  it('#getAccountEmail should return correct email', (done: DoneFn) => {
    const result$ = service.getAccountEmail$();
    result$.subscribe((v) => {
      expect(v).toEqual('email');
      done();
    });
  });

  it('#getAccountBaseUrl should return correct baseUrl', (done: DoneFn) => {
    const result$ = service.getAccountBaseUrl$();
    result$.subscribe((v) => {
      expect(v).toEqual('http://localhost:8080/api/accounts/email');
      done();
    });
  });

  it('#getUserName should return correct userName', (done: DoneFn) => {
    const result$ = service.getUserName$();
    result$.subscribe((v) => {
      expect(v).toEqual('name');
      done();
    });
  });

  it('#getAuthenticatedStatus should return correct authState', (done: DoneFn) => {
    const result$ = service.getAuthenticateStatus$();
    result$.subscribe((v) => {
      expect(v).toBeTruthy();
      done();
    });
  });
});
