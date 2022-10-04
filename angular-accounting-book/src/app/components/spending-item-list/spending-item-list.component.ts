import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { SpendingItem } from 'src/app/data-types';
import { SpendingItemService } from 'src/app/services/spending-item.service';
import { Category } from 'src/app/data-types';
import { isEmpty } from 'rxjs';

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
  categories = Object.values(Category);
  filterForm: FormGroup;
  text = '';
  category = '';
  filterMode = false;

  constructor(
    private spendingItemService: SpendingItemService,
    formBuilder: FormBuilder,
    route: ActivatedRoute
  ) {
    this.filterForm = formBuilder.group({
      text: [this.text],
      category: [this.category],
    });
    this.filterForm.controls['text'].valueChanges.subscribe((value) => {
      this.text = value;
      this.spendingItemService
        .filterSpendingItem(this.text, 'text')
        .subscribe((data) => {
          this.dataSource = data;
        });
      console.log(this.text);
    });
    this.filterForm.controls['category'].valueChanges.subscribe((value) => {
      this.category = value;
      this.spendingItemService
        .filterSpendingItem(this.category, 'category')
        .subscribe((data) => {
          this.dataSource = data;
        });
      console.log(this.category);
    });
    this.filterMode = this.text !== '' || this.category !== '';
    if (!this.filterMode) {
      // List full items list
      route.paramMap.subscribe((map) => {
        const currentBookId = parseInt(map.get('id')!);
        this.listSpendingItem(currentBookId);
      });
    }
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
