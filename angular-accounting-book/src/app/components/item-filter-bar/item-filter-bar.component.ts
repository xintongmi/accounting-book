import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/data-types';

export interface FilterChange {
  startDate: Date;
  endDate: Date;
  text: string;
  category: Category;
  min: number;
  max: number;
}

@Component({
  selector: 'app-item-filter-bar',
  templateUrl: './item-filter-bar.component.html',
  styleUrls: ['./item-filter-bar.component.scss'],
})
export class FilterBarComponent implements OnDestroy {
  filterForm: FormGroup;
  categories = Object.values(Category);
  private readonly destroy = new Subject<void>();

  @Output()
  readonly filterChange = new EventEmitter<FilterChange>();

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = formBuilder.group({
      startDate: [],
      endDate: [],
      text: [],
      category: [Category.ALL],
      min: ['', Validators.pattern('^([0-9]+(\\.[0-9]?[0-9]?)?)$')],
      max: ['', Validators.pattern('^([0-9]+(\\.[0-9]?[0-9]?)?)$')],
    });
    this.filterForm.valueChanges
      .pipe(debounceTime(200), takeUntil(this.destroy))
      .subscribe((v) => {
        if (this.filterForm.valid) {
          this.filterChange.next(v);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
