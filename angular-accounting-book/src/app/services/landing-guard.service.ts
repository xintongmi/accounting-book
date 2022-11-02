import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root',
})
export class LandingGuardService implements CanActivate {
  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private readonly router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authed = await this.oktaAuth.isAuthenticated();
    if (authed) {
      this.router.navigate(['books']);
    }
    return !authed;
  }
}
