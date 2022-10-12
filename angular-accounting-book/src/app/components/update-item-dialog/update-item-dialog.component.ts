import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, SpendingItem } from 'src/app/data-types';

@Component({
  selector: 'app-update-item-dialog',
  templateUrl: './update-item-dialog.component.html',
  styleUrls: ['./update-item-dialog.component.scss'],
})
export class UpdateItemDialogComponent {
  dialogForm: FormGroup;
  categories = Object.values(Category).filter((v) => v !== Category.ALL);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateItemDialogComponent, SpendingItem>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { item: SpendingItem }
  ) {
    this.dialogForm = formBuilder.group({
      date: [this.data.item?.date, Validators.required],
      category: [this.data.item?.category, Validators.required],
      description: [
        this.data.item?.description ?? '',
        Validators.maxLength(100),
      ],
      merchant: [this.data.item?.merchant ?? '', Validators.maxLength(30)],
      amount: [
        this.data.item?.amount ?? 0,
        [
          Validators.required,
          Validators.pattern('^([0-9]+(\\.[0-9]?[0-9]?)?)$'),
        ],
      ],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogForm.markAllAsTouched();
    if (this.dialogForm.valid) {
      this.dialogRef.close({
        id: this.data.item?.id ?? -1,
        ...this.dialogForm.value,
      });
    }
  }
}
