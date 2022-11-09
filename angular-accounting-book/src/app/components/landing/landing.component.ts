import { Component, Inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { AuthTransaction, OktaAuth } from '@okta/okta-auth-js';

interface LandingImgConfig {
  src: string;
  title?: string;
  subtitle?: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  slides: LandingImgConfig[] = [
    {
      src: '../../assets/images/landing-page-01.svg',
    },
    {
      src: '../../assets/images/landing-page-02.png',
    },
  ];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

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
