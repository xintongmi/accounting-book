import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Category, SpendingItem } from 'src/app/data-types';
import { SpendingItemService } from 'src/app/services/spending-item.service';
import { FilterChange } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-spending-item-list',
  templateUrl: './spending-item-list.component.html',
  styleUrls: ['./spending-item-list.component.scss'],
})
export class SpendingItemListComponent implements OnInit {
  dataSource: SpendingItem[] = [];
  bookId = 0;
  displayedColumns: String[] = [
    'date',
    'category',
    'description',
    'merchant',
    'amount',
  ];
  pageMode: 'records' | 'report' = 'records';

  pageIndex = 0;
  pageSize = 10;
  length = 0;
  category = Category.ALL;
  text = '';

  constructor(
    private spendingItemService: SpendingItemService,
    route: ActivatedRoute
  ) {
    route.paramMap.subscribe((map) => {
      this.bookId = parseInt(map.get('id')!);
      this.refreshTable();
    });
  }

  ngOnInit(): void {}

  changeMode(event: MatSelectionListChange) {
    const selectedOption = event.options[0].value;
    if (selectedOption === 'records' || selectedOption === 'report') {
      this.pageMode = selectedOption;
    } else {
      throw new Error(`Unsupported page mode: ${selectedOption}`);
    }
  }

  listFilteredItems(filteredItems: SpendingItem[]) {
    this.dataSource = filteredItems;
  }

  refreshTableOnFilterChange(filterChange: FilterChange) {
    this.text = filterChange.text;
    this.category = filterChange.category;
    this.pageIndex = 0;

    this.refreshTable();
  }

  refreshTableOnPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.refreshTable();
  }

  refreshTable() {
    this.spendingItemService
      .getSpendingItemList(
        this.bookId,
        this.pageIndex,
        this.pageSize,
        this.category,
        this.text
      )
      .subscribe(this.processResponse());
  }

  processResponse() {
    return (data: any) => {
      this.dataSource = data.spendingItems;
      this.length = data.page.totalElements;
    };
  }
}
