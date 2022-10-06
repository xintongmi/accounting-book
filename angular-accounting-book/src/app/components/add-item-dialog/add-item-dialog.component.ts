import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, SpendingItem } from 'src/app/data-types';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
})
export class AddItemDialogComponent {
  dialogForm: FormGroup;
  categories = Object.values(Category).filter((v) => v !== Category.All);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent, SpendingItem>,
    @Inject(MAT_DIALOG_DATA) private readonly item?: SpendingItem
  ) {
    this.dialogForm = formBuilder.group({
      date: [this.item?.date, Validators.required],
      category: [this.item?.category, Validators.required],
      description: [this.item?.description ?? '', Validators.maxLength(100)],
      merchant: [this.item?.merchant ?? '', Validators.maxLength(30)],
      amount: [this.item?.amount, Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogForm.markAllAsTouched();
    if (this.dialogForm.valid) {
      this.dialogRef.close({
        id: this.item?.id ?? -1,
        ...this.dialogForm.value,
      });
    }
  }
}
