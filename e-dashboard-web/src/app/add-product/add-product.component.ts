import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private authService: AuthService, private NotificationService: NotificationService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      category: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    this.productForm.value.price = parseInt(this.productForm.value.price);
    this.productService.addProduct(this.productForm.value).subscribe(user => {
      if (user.error)
        this.NotificationService.showError(user.error);
      if (!user.data) return;
      this.NotificationService.showSuccess('Product Added Successfully!');
      this.initForm();
    })
  }

}
