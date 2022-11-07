import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { LandingGuardService } from './landing-guard.service';

describe('AuthGuardService', () => {
  let service: LandingGuardService;
  let mockOktaAuth: any;
  let mockRouter: any;
  let mockRoute: any;
  let mockState: any;

  beforeEach(() => {
    mockOktaAuth = jasmine.createSpyObj('OKTA_AUTH', ['isAuthenticated']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = jasmine.createSpyObj('ActivatedRouteSnapshot', ['placeHolder']);
    mockState = jasmine.createSpyObj('RouterStateSnapshot', ['placeHolder']);

    TestBed.configureTestingModule({
      providers: [
        { provide: OKTA_AUTH, useValue: mockOktaAuth },
        { provide: Router, useValue: mockRouter },
        LandingGuardService,
      ],
    });
    service = TestBed.inject(LandingGuardService);
  });

  it('#canActivate should return true in case of user is not authenticated', (done: DoneFn) => {
    mockOktaAuth.isAuthenticated.and.returnValue(false);
    const result$ = service.canActivate(mockRoute, mockState);
    result$.then((v) => {
      expect(v).toBeTruthy();
      done();
    });
  });

  it('#canActivate should return false and navigate to correct url in case of user is authenticated', (done: DoneFn) => {
    mockOktaAuth.isAuthenticated.and.returnValue(true);
    const result$ = service.canActivate(mockRoute, mockState);
    result$.then((v) => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['books']);
      expect(v).toBeFalsy();
      done();
    });
  });
});
