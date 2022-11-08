import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpendingItemListRoutingModule } from './spending-item-list-routing.module';
import { SpendingItemListComponent } from './spending-item-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginStatusModule } from '../login-status/login-status.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateItemDialogModule } from '../update-item-dialog/update-item-dialog.module';
import { FilterBarModule } from '../item-filter-bar/item-filter-bar.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [SpendingItemListComponent],
  exports: [SpendingItemListComponent],
  imports: [
    CommonModule,
    SpendingItemListRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LoginStatusModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateItemDialogModule,
    FilterBarModule,
  ],
})
export class SpendingItemListModule {}
