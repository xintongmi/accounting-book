import { environment } from 'src/environments/environment';

/** Get base url according to environment. */
export function getBackendBaseUrl() {
  if (environment.production) {
    return 'https://xintongthecoder.com/api';
  } else {
    return 'http://localhost:8080/api';
  }
}
