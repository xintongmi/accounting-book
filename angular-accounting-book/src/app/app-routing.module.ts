import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AccountBookListComponent } from './components/account-book-list/account-book-list.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LandingGuardService } from './services/landing-guard.service';

function sendToLandingPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/landing']);
}

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: '',
    component: AccountBookListComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLandingPage },
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./components/landing/landing.module').then(
        (m) => m.LandingModule
      ),
    canActivate: [LandingGuardService],
  },
  { path: 'login/callback', component: OktaCallbackComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  // [OktaAuthGuard] garantees no one can backdoor the routes or
  // access the routes directly without being authenticated
  {
    path: 'books',
    loadChildren: () =>
      import('./components/account-book-list/account-book-list.module').then(
        (m) => m.AccountBookListModule
      ),
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },
  {
    path: 'books/:id/items',
    loadChildren: () =>
      import('./components/spending-item-list/spending-item-list.module').then(
        (m) => m.SpendingItemListModule
      ),
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },
  { path: '**', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
