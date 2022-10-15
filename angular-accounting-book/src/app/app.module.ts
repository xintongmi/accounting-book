import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG,
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountBookListComponent } from './components/account-book-list/account-book-list.component';
import { AccountBookService } from './services/account-book.service';
import { AccountService } from './services/account.service';
import { SpendingItemListComponent } from './components/spending-item-list/spending-item-list.component';
import { FilterBarComponent } from './components/item-filter-bar/item-filter-bar.component';
import { UpdateItemDialogComponent } from './components/update-item-dialog/update-item-dialog.component';
import { UpdateBookDialogComponent } from './components/update-book-dialog/update-book-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LandingComponent } from './components/landing/landing.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    AccountBookListComponent,
    SpendingItemListComponent,
    FilterBarComponent,
    UpdateItemDialogComponent,
    UpdateBookDialogComponent,
    LoginComponent,
    LoginStatusComponent,
    LandingComponent,
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatToolbarModule,
    OktaAuthModule,
  ],
  providers: [
    AccountBookService,
    AccountService,
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
