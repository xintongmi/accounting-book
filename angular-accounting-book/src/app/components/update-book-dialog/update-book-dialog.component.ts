import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountBook } from 'src/app/data-types';

@Component({
  selector: 'app-update-book-dialog',
  templateUrl: './update-book-dialog.component.html',
  styleUrls: ['./update-book-dialog.component.scss'],
})
export class UpdateBookDialogComponent {
  dialogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateBookDialogComponent, AccountBook>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { book: AccountBook }
  ) {
    this.dialogForm = formBuilder.group({
      name: [this.data.book?.name, Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogForm.markAllAsTouched();
    if (this.dialogForm.valid) {
      this.dialogRef.close({
        id: this.data.book?.id ?? -1,
        ...this.dialogForm.value,
      });
    }
  }
}
