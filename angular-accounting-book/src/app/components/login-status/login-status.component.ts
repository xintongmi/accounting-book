import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated = false;
  userFullName = '';

  constructor(
    private oktaAuthService: OktaAuthStateService,
    private accountService: AccountService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      from(this.oktaAuth.getUser()).subscribe((res) => {
        this.userFullName = res.name ?? '';
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }
}
