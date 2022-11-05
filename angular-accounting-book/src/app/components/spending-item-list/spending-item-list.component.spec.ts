import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccountBookService } from 'src/app/services/account-book.service';
import { SpendingItemService } from 'src/app/services/spending-item.service';

import { SpendingItemListComponent } from './spending-item-list.component';

describe('SpendingItemListComponent', () => {
  let component: SpendingItemListComponent;
  let fixture: ComponentFixture<SpendingItemListComponent>;
  let mockSpendingItemService: any;
  let mockAccountBookService: any;
  let mockActivatedRoute: any;
  let dialog: MatDialog;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockSpendingItemService = jasmine.createSpyObj('SpendingItemService', [
      'getSpendingItemList',
      'addItem',
      'updateItem',
      'deleteItem',
    ]);
    mockAccountBookService = jasmine.createSpyObj('AccountBookService', [
      'getAccountBook',
    ]);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [SpendingItemListComponent],
      providers: [
        { provide: SpendingItemService, useValue: mockSpendingItemService },
        { provide: AccountBookService, useValue: mockAccountBookService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialog },
        SpendingItemListComponent,
      ],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SpendingItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
