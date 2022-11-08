import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { APP_CONFIG, DEV_APP_CONFIG } from './config/app-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountBookService } from './services/account-book.service';
import { AccountService } from './services/account.service';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { environment } from 'src/environments/environment';

const oktaConfig = environment.production
  ? APP_CONFIG.oidc
  : DEV_APP_CONFIG.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
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
