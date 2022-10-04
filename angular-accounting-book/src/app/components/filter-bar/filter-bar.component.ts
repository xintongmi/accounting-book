import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/data-types';

export interface FilterChange {
  text: string;
  category: Category;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnDestroy {
  filterForm: FormGroup;
  categories = Object.values(Category);
  private readonly destroy = new Subject<void>();

  @Output()
  readonly filterChange = new EventEmitter<FilterChange>();

  constructor(formBuilder: FormBuilder) {
    this.filterForm = formBuilder.group({
      text: [],
      category: [],
    });
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((v) => {
        this.filterChange.next(v);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
