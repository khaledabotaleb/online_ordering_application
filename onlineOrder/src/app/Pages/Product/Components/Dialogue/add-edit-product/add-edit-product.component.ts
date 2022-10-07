import {Component, Inject, OnInit, Sanitizer} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: any = null;

  constructor(
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [this.data.data.name, [Validators.required]],
      description: [this.data.data.description, [Validators.required]],
      price: [this.data.data.price, [Validators.required]],
      stock_items: [this.data.data.stock_items, [Validators.required]],
      image: [this.data.data.image],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.productForm.patchValue({image: this.selectedFile});
    this.productForm.get('image')?.updateValueAndValidity();
  }

  onDeleteImage(): void {
    this.data.data.image = null
    this.productForm.patchValue({image: null});
    this.productForm.get('image')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      return;
    }
    this.dialogRef.close(this.productForm.value)
  }
}
