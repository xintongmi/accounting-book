import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingItemListComponent } from './spending-item-list.component';

describe('SpendingItemListComponent', () => {
  let component: SpendingItemListComponent;
  let fixture: ComponentFixture<SpendingItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
