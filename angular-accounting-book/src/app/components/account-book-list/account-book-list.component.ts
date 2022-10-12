import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountBook } from 'src/app/data-types';
import { AccountBookService } from 'src/app/services/account-book.service';
import { AccountService } from 'src/app/services/account.service';
import { UpdateBookDialogComponent } from '../update-book-dialog/update-book-dialog.component';

@Component({
  selector: 'app-account-book-list',
  templateUrl: './account-book-list.component.html',
  styleUrls: ['./account-book-list.component.scss'],
})
export class AccountBookListComponent implements OnInit {
  accountBooks: AccountBook[] = [];

  @ViewChild('deleteConfirmDialog')
  deleteConfirmDialog!: TemplateRef<any>;

  pendingDeleteBook?: AccountBook;

  constructor(
    private accountBookService: AccountBookService,
    public dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listAccountBooks();
  }

  listAccountBooks() {
    this.accountBookService.getAccountBookList().subscribe((data) => {
      this.accountBooks = data.accountBooks;
    });
  }

  openEditBookDialog(existingBook?: AccountBook) {
    const dialogRef = this.dialog.open(UpdateBookDialogComponent, {
      width: '500px',
      height: '400px',
      data: {
        book: existingBook,
      },
    });
    dialogRef.afterClosed().subscribe((book) => {
      // If canceled
      if (!book) {
        return;
      }
      const response$ = existingBook
        ? this.accountBookService.updateBook(book)
        : this.accountBookService.addBook(book);
      response$.subscribe(() => {
        this.refreshBookList();
        this.snackBar.open(
          existingBook ? 'Book updated!' : 'Book added!',
          undefined,
          { duration: 5000 }
        );
      });
    });
  }

  refreshBookList() {
    this.listAccountBooks();
  }

  openDeleteBookDialog(book: AccountBook) {
    this.pendingDeleteBook = book;
    this.dialog.open(this.deleteConfirmDialog);
  }

  deleteBook() {
    if (this.pendingDeleteBook) {
      this.accountBookService
        .deleteBook(this.pendingDeleteBook)
        .subscribe(() => {
          this.refreshBookList();
          this.snackBar.open('Successfully deleted!', undefined, {
            duration: 5000,
          });
        });
    }
  }
}
