import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountBookListComponent } from './account-book-list.component';
import { AccountBookListRoutingModule } from './account-book-list-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginStatusModule } from '../login-status/login-status.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateBookDialogModule } from '../update-book-dialog/update-book-dialog.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AccountBookListComponent],
  exports: [AccountBookListComponent],
  imports: [
    CommonModule,
    AccountBookListRoutingModule,
    UpdateBookDialogModule,
    LoginStatusModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class AccountBookListModule {}
