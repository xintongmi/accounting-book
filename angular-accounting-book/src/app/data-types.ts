export interface AccountBook {
  id: number;
  name: string;
}

/** Segments for each entities. */
export enum ApiEntitySegments {
  ACCOUNTS = 'accounts',
  BOOKS = 'books',
  ITEMS = 'items',
}

export interface SpendingItem {
  id: number;
  category: string;
  description: string;
  merchant: string;
  amount: number;
  date: Date;
  bookId: number;
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

export interface ListSpendingItemResponse {
  page: ListPage;
  spendingItems: SpendingItem[];
}

export enum Category {
  ALL = 'ALL',
  HOUSEHOLD = 'HOUSEHOLD',
  GROCERY = 'GROCERY',
  UTILITY = 'UTILITY',
  CLOTHING = 'CLOTHING',
  ENTERTAINMENT = 'ENTERTAINMENT',
}
