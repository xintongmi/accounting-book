import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { APP_CONFIG, DEV_APP_CONFIG } from './config/app-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountBookService } from './services/account-book.service';
import { AccountService } from './services/account.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const oktaConfig = environment.production
  ? APP_CONFIG.oidc
  : DEV_APP_CONFIG.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OktaAuthModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
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
