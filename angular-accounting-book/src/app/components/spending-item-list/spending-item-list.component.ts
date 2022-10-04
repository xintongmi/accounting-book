import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { SpendingItem } from 'src/app/data-types';
import { SpendingItemService } from 'src/app/services/spending-item.service';
import { FilterChange } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-spending-item-list',
  templateUrl: './spending-item-list.component.html',
  styleUrls: ['./spending-item-list.component.scss'],
})
export class SpendingItemListComponent implements OnInit {
  dataSource: SpendingItem[] = [];
  displayedColumns: String[] = [
    'date',
    'category',
    'description',
    'merchant',
    'amount',
  ];
  pageMode: 'records' | 'report' = 'records';

  constructor(
    private spendingItemService: SpendingItemService,
    route: ActivatedRoute
  ) {
    route.paramMap.subscribe((map) => {
      const currentBookId = parseInt(map.get('id')!);
      this.listSpendingItems(currentBookId);
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

  listSpendingItems(bookId: number) {
    this.spendingItemService.getSpendingItemList(bookId).subscribe((data) => {
      this.dataSource = data;
    });
  }

  listFilteredItems(filteredItems: SpendingItem[]) {
    this.dataSource = filteredItems;
  }

  filter(filterChange: FilterChange) {
    const category = filterChange.category;

    this.spendingItemService
      .filterSpendingItems(category, 'category')
      .subscribe((data) => {
        this.dataSource = data;
      });
  }
}
