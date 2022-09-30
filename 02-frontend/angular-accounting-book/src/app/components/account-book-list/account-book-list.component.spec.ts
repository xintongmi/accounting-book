import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBookListComponent } from './account-book-list.component';

describe('AccountBookListComponent', () => {
  let component: AccountBookListComponent;
  let fixture: ComponentFixture<AccountBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
