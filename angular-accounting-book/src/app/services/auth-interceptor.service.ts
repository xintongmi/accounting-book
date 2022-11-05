import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, lastValueFrom, Observable } from 'rxjs';
import { getBackendBaseUrl } from '../common/utils';
import { ApiEntitySegments } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(@Inject(OKTA_AUTH) private readonly oktaAuth: OktaAuth) {}

  intercept$(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add an access token for secured endpoints
    const securedEndpoints = [
      `${getBackendBaseUrl()}/${ApiEntitySegments.ACCOUNTS}`,
    ];
    if (securedEndpoints.some((url) => request.urlWithParams.includes(url))) {
      // Get access token
      const accessToken = this.oktaAuth.getAccessToken();
      // Clone the request and add new header with access token
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
    }
    return from(lastValueFrom(next.handle(request)));
  }
}
