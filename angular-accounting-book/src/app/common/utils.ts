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

export function getAccountUrl(accountId: number): string {
  return `${getBackendBaseUrl()}/${ApiEntitySegments.ACCOUNTS}/${accountId}/${
    ApiEntitySegments.BOOKS
  }`;
}

export function getAccountBookUrl(accountId: number, bookId: number): string {
  return `${getBackendBaseUrl()}/${ApiEntitySegments.BOOKS}/${bookId}`;
}
