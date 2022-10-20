export const APP_CONFIG = {
  oidc: {
    clientId: '0oa6u5tj1naCe3IdB5d7',
    issuer: 'https://dev-73315855.okta.com/oauth2/default',
    redirectUri:
      // 'https://xintongthecoder.github.io/accounting-book/login/callback',
      'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
