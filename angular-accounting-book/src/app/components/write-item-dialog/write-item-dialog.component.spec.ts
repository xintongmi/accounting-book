import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteItemDialogComponent } from './write-item-dialog.component';

describe('WriteItemDialogComponent', () => {
  let component: WriteItemDialogComponent;
  let fixture: ComponentFixture<WriteItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WriteItemDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WriteItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
