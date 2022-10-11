import { Component, OnInit } from '@angular/core';
import { AccountBook } from 'src/app/data-types';
import { AccountBookService } from 'src/app/services/account-book.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-book-list',
  templateUrl: './account-book-list.component.html',
  styleUrls: ['./account-book-list.component.scss'],
})
export class AccountBookListComponent implements OnInit {
  accountBooks: AccountBook[] = [];
  constructor(
    private accountBookService: AccountBookService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.listAccountBooks();
  }

  listAccountBooks() {
    this.accountBookService.getAccountBookList().subscribe((data) => {
      this.accountBooks = data.accountBooks;
    });
  }

  createBook() {}
}
