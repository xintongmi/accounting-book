import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../common/utils';
import { Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ApiEntitySegments } from '../data-types';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    @Inject(OKTA_AUTH) private readonly oktaAuth: OktaAuth,
    private readonly oktaAuthService: OktaAuthStateService
  ) {}

  getAccountEmail$(): Observable<string> {
    // from(Promise) to Observable
    return from(this.oktaAuth.getUser()).pipe(
      map((userClaim) => userClaim.email!)
    );
  }

  getAccountBaseUrl(): Observable<string> {
    return this.getAccountEmail$().pipe(
      map(
        (userEmail) =>
          `${getBackendBaseUrl()}/${ApiEntitySegments.ACCOUNTS}/${userEmail}`
      )
    );
  }

  getUserName(): Observable<string> {
    return from(this.oktaAuth.getUser()).pipe(
      map((userClaim) => userClaim.name!)
    );
  }

  getAuthenticateStatus(): Observable<boolean> {
    return from(
      this.oktaAuthService.authState$.pipe(
        map((result) => result.isAuthenticated!)
      )
    );
  }
}
