import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Category, SpendingItem } from 'src/app/data-types';
import { AccountBookService } from 'src/app/services/account-book.service';
import { SpendingItemService } from 'src/app/services/spending-item.service';
import { FilterChange } from '../item-filter-bar/item-filter-bar.component';
import { UpdateItemDialogComponent } from '../update-item-dialog/update-item-dialog.component';

@Component({
  selector: 'app-spending-item-list',
  templateUrl: './spending-item-list.component.html',
  styleUrls: ['./spending-item-list.component.scss'],
})
export class SpendingItemListComponent {
  dataSource = new MatTableDataSource<SpendingItem>();
  isLoading = false;
  bookId = 0;
  bookName = '';
  displayedColumns: String[] = [
    'date',
    'category',
    'description',
    'merchant',
    'amount',
    'buttons',
  ];
  pageMode: 'records' | 'report' = 'records';

  pageIndex = 0;
  pageSize = 10;
  length = 0;
  startDate!: Date;
  endDate!: Date;
  category = Category.ALL;
  text = '';
  min = 0;
  max = 0;
  sortBy = 'date';
  sortDir: 'asc' | 'desc' = 'desc';

  newItemDate?: Date;
  newItemCategory? = Category;
  newItemDescription = '';
  newItemMerchant = '';
  newItemAmount?: number;

  @ViewChild('deleteConfirmDialog')
  deleteConfirmDialog!: TemplateRef<any>;

  pendingDeleteItem?: SpendingItem;

  constructor(
    private spendingItemService: SpendingItemService,
    private accountBookService: AccountBookService,
    route: ActivatedRoute,
    public dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    route.paramMap.subscribe((map) => {
      this.bookId = parseInt(map.get('id')!);
      this.refreshTable();
    });
    this.accountBookService
      .getAccountBook$(this.bookId)
      .subscribe((response) => {
        this.bookName = response.accountBooks[0].name;
      });
  }

  changeMode(event: MatSelectionListChange) {
    const selectedOption = event.options[0].value;
    if (selectedOption === 'records' || selectedOption === 'report') {
      this.pageMode = selectedOption;
    } else {
      throw new Error(`Unsupported page mode: ${selectedOption}`);
    }
  }

  listFilteredItems(filteredItems: MatTableDataSource<SpendingItem>) {
    this.dataSource = filteredItems;
  }

  refreshTableOnFilterChange(filterChange: FilterChange) {
    this.startDate = filterChange.startDate;
    this.endDate = filterChange.endDate;
    this.text = filterChange.text;
    this.category = filterChange.category;
    this.min = filterChange.min;
    this.max = filterChange.max;
    this.pageIndex = 0;

    this.refreshTable();
  }

  refreshTableOnSort(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.sortBy = sort.active;
    this.sortDir = sort.direction === 'asc' ? 'desc' : 'asc';

    this.refreshTable();
  }

  refreshTableOnPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.refreshTable();
  }

  refreshTable() {
    this.isLoading = true;
    this.spendingItemService
      .getSpendingItemList$(
        this.bookId,
        this.pageIndex,
        this.pageSize,
        this.startDate,
        this.endDate,
        this.text,
        this.category,
        this.min,
        this.max,
        this.sortBy,
        this.sortDir
      )
      .subscribe(this.processResponse());
  }

  processResponse() {
    return (data: any) => {
      this.dataSource = new MatTableDataSource(data.spendingItems);
      // this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      this.length = data.page.totalElements;
      this.isLoading = false;
    };
  }

  openEditItemDialog(existingItem?: SpendingItem) {
    const dialogRef = this.dialog.open(UpdateItemDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        item: existingItem,
      },
    });
    dialogRef.afterClosed().subscribe((item) => {
      // If canceled.
      if (!item) {
        return;
      }
      item.bookId = this.bookId;
      const response$ = existingItem
        ? this.spendingItemService.updateItem$(item)
        : this.spendingItemService.addItem$(item);

      response$.subscribe(() => {
        this.refreshTable();
        this.snackBar.open(
          existingItem ? 'Item updated!' : 'Item added!',
          undefined,
          { duration: 5000 }
        );
      });
    });
  }

  openDeleteItemDialog(item: SpendingItem) {
    this.pendingDeleteItem = item;
    this.dialog.open(this.deleteConfirmDialog);
  }

  deleteItem() {
    if (this.pendingDeleteItem) {
      this.spendingItemService
        .deleteItem$(this.pendingDeleteItem)
        .subscribe(() => {
          this.refreshTable();
          this.snackBar.open('Successfully deleted!', undefined, {
            duration: 5000,
          });
        });
    }
  }
}
