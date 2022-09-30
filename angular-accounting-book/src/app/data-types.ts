export interface AccountBook {
  uri: string;
  name: string;
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
}

export interface ListAccountBookResponse {
  page: ListPage;
  accountBooks: AccountBook[];
}
