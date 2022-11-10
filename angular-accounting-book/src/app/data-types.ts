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
  category: Category;
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
  RESTAURANT = 'RESTAURANT',
  HOUSING = 'HOUSING',
  UTILITY = 'UTILITY',
  TAX = 'TAX',
  TRANSPORTATION = 'TRANSPORTATION',
  HEALTHCARE = 'HEALTHCARE',
  PERSONALCARE = 'PERSONALCARE',
  LEARNING = 'LEARNING',
  SPORT = 'SPORT',
  HOBBY = 'HOBBY',
  CLOTHING = 'CLOTHING',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TRAVEL = 'TRAVEL',
  SOCIAL = 'SOCIAL',
  MEMBERSHIP = 'MEMBERSHIP',
  MISCELLANEOUS = 'MISCELLANEOUS',
}
