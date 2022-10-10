import { environment } from 'src/environments/environment';
import { ApiEntitySegments } from '../data-types';

export function getIdByReverseIndex(uri: string, reverseIndex: number) {}

/** Get base url according to environment. */
export function getBackendBaseUrl() {
  if (environment.production) {
    return 'http://xintongTheCoder.com/api';
  } else {
    return 'http://localhost:8080/api';
  }
}

export function getAccountBookUrl(bookId: number): string {
  return `${getBackendBaseUrl()}/${ApiEntitySegments.BOOKS}/${bookId}`;
}
