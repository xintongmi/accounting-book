import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly oktaAuthGuard: OktaAuthGuard,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.oktaAuthGuard.canActivate(route, state).then((res) => {
      if (res) {
        this.router.navigate(['books']);
      }
      return !res;
    });
  }
}
