import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../common/utils';
import { Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ApiEntitySegments } from '../data-types';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  storage = sessionStorage;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  getAccountEmail(): Observable<string> {
    // from(Promise) to Observable
    return from(this.oktaAuth.getUser()).pipe(
      map((userClaim) => userClaim.email!)
    );
  }

  getAccountBaseUrl(): Observable<string> {
    return this.getAccountEmail().pipe(
      map(
        (userEmail) =>
          `${getBackendBaseUrl()}/${ApiEntitySegments.ACCOUNTS}/${userEmail}`
      )
    );
  }
}
