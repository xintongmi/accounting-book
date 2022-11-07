import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OKTA_AUTH } from '@okta/okta-angular';
import { of } from 'rxjs';
import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let mockOktaAuth: any;
  let mockHttpRequest: any;
  let mockHttpHandler: any;

  const securedEndpoints = ['http://localhost:8080/api/accounts'];

  beforeEach(() => {
    mockOktaAuth = jasmine.createSpyObj('OKTA_AUTH', ['getAccessToken']);
    mockHttpRequest = jasmine.createSpyObj('HttpRequest', ['clone'], {
      urlWithParams: securedEndpoints,
    });
    mockHttpHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    mockOktaAuth.getAccessToken.and.returnValue('accessToken');
    mockHttpHandler.handle.and.returnValue(
      of(Promise.resolve(mockHttpRequest))
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: OKTA_AUTH, useValue: mockOktaAuth },
        { provide: HttpRequest, useValue: mockHttpRequest },
        { provide: HttpHandler, useValue: mockHttpHandler },
        AuthInterceptorService,
      ],
    });
    service = TestBed.inject(AuthInterceptorService);
  });

  it('#intercept should set correct header', (done: DoneFn) => {
    const result$ = service.intercept(mockHttpRequest, mockHttpHandler);
    result$.subscribe((v) => {
      expect(mockHttpRequest.clone).toHaveBeenCalledWith({
        setHeaders: {
          Authorization: 'Bearer accessToken',
        },
      });
      done();
    });
  });
});
