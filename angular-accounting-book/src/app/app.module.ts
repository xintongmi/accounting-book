import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountBookListComponent } from './components/account-book-list/account-book-list.component';
import { AccountBookService } from './services/account-book.service';
import { SpendingItemListComponent } from './components/spending-item-list/spending-item-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatTableModule } from '@angular/material/table';
import { AccountService } from './services/account.service';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateItemDialogComponent } from './components/update-item-dialog/update-item-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    AccountBookListComponent,
    SpendingItemListComponent,
    FilterBarComponent,
    UpdateItemDialogComponent,
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  providers: [AccountBookService, AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
