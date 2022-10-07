import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-quantity-product',
  templateUrl: './quantity-product.component.html',
  styleUrls: ['./quantity-product.component.scss']
})
export class QuantityProductComponent implements OnInit {
  productQuantityForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<QuantityProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.productQuantityForm = this.formBuilder.group({
      quantity: [this.data.data.quantity ? this.data.data.quantity : 1, [Validators.required, Validators.max(this.data.maxValue)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.productQuantityForm.valid) {
      return;
    }
    this.dialogRef.close(this.productQuantityForm.value)
  }
}
