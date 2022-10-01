import { Component, OnInit } from '@angular/core';
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
}
