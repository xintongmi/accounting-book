import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { AuthTransaction, OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  slides: any[] = new Array(3).fill({
    id: -1,
    src: '',
    title: '',
    subtitle: '',
  });

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  ngOnInit(): void {
    this.slides[0] = {
      src: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
    };
    this.slides[1] = {
      src: 'https://mdbcdn.b-cdn.net/img/new/slides/042.webp',
    };
    this.slides[2] = {
      src: 'https://mdbcdn.b-cdn.net/img/new/slides/043.webp',
    };
  }

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
