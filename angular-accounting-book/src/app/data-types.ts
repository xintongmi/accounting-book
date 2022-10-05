export interface AccountBook {
  id: number;
  name: string;
}

/** Segments for each entities. */
export enum ApiEntitySegments {
  ACCOUNTS = 'accounts',
  BOOKS = 'accountBooks',
  ITEMS = 'spendingItems',
}

export interface SpendingItem {
  id: number;
  category: string;
  description: string;
  merchant: string;
  amount: number;
  date: Date;
  accoundBookId: number;
}

export interface ListPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface ListAccountBookResponse {
  page: ListPage;
  accountBooks: AccountBook[];
}

export enum Category {
  All = 'ALL',
  HouseHold = 'HOUSEHOLD',
  Grocery = 'GROCERY',
  Utilities = 'UTILITY',
  Entertainment = 'ENTERTAINMENT',
}
