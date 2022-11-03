import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated = false;
  userName?: string;

  constructor(
    @Inject(OKTA_AUTH) private readonly oktaAuth: OktaAuth,
    private readonly accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadAuthenticateStatus();
    this.loadUserName();
  }

  loadAuthenticateStatus() {
    this.accountService.getAuthenticateStatus$().subscribe((result) => {
      this.isAuthenticated = result;
    });
  }

  loadUserName() {
    this.accountService.getUserName$().subscribe((result) => {
      this.userName = result;
    });
  }

  logout() {
    // Terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
    this.userName = '';
  }
}
