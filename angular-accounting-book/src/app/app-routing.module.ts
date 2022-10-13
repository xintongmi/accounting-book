import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBookListComponent } from './components/account-book-list/account-book-list.component';
import { SpendingItemListComponent } from './components/spending-item-list/spending-item-list.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: AccountBookListComponent },
  { path: 'books/:id/items', component: SpendingItemListComponent },
  // { path: '', redirectTo: '/books', pathMatch: 'full' },
  // { path: '**', redirectTo: '/books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
