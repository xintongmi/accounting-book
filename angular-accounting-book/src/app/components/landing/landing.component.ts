import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { AuthTransaction, OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  ngOnInit(): void {}

  signinWithTrialAccount() {
    const username = 'accbooktrial@gmail.com';
    const password = 'accountingbooktrialaccount';
    this.oktaAuth
      .signInWithCredentials({
        username,
        password,
      })
      .then((res: AuthTransaction) => {
        this.oktaAuth.signInWithRedirect({ sessionToken: res.sessionToken });
      });
  }
}
