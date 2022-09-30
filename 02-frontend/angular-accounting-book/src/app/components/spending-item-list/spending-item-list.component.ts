import { Component, OnInit } from '@angular/core';
import { SpendingItem } from 'src/app/data-types';
import { SpendingItemService } from 'src/app/services/spending-item.service';

@Component({
  selector: 'app-spending-item-list',
  templateUrl: './spending-item-list.component.html',
  styleUrls: ['./spending-item-list.component.scss']
})
export class SpendingItemListComponent implements OnInit {

  displayedColumns: String[] = ['date', 'category', 'description', 'merchant', 'amount'];
  dataSource: SpendingItem[] = [];

  constructor(private spendingItemService: SpendingItemService) { }

  ngOnInit(): void {
    this.listSpendingItem();
  }

  listSpendingItem() {
    this.spendingItemService.getSpendingItemList().subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }

}
