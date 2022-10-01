import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { SpendingItem } from 'src/app/data-types';
import { SpendingItemService } from 'src/app/services/spending-item.service';

@Component({
  selector: 'app-spending-item-list',
  templateUrl: './spending-item-list.component.html',
  styleUrls: ['./spending-item-list.component.scss'],
})
export class SpendingItemListComponent implements OnInit {
  displayedColumns: String[] = [
    'date',
    'category',
    'description',
    'merchant',
    'amount',
  ];
  dataSource: SpendingItem[] = [];
  pageMode: 'records' | 'report' = 'records';

  constructor(
    private spendingItemService: SpendingItemService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((map) => {
      const currentBookId = parseInt(map.get('id')!);
      this.listSpendingItem(currentBookId);
    });
  }

  ngOnInit(): void {}

  listSpendingItem(bookId: number) {
    this.spendingItemService.getSpendingItemList(bookId).subscribe((data) => {
      this.dataSource = data;
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
}
