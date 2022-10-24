import { environment } from 'src/environments/environment';

/** Get base url according to environment. */
export function getBackendBaseUrl() {
  if (environment.production) {
    // return 'http://api.xintongTheCoder.com';
    return 'http://34.68.21.45:8080/api';
  } else {
    return 'http://34.68.21.45:8080/api';
  }
}
