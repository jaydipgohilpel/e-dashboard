import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../interface/product.interface';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
  productForm!: FormGroup;
  product!: Product | string | any;

  constructor(private fb: FormBuilder, private productService: ProductService, private authService: AuthService, private NotificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.product = localStorage.getItem('productToUpdate');
    if (this.product) {
      this.product = JSON.parse(this.product);
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        category: this.product.category,
        company: this.product.company,
        description: this.product.description,
      });
    }
    else this.router.navigate(['/products']);
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
    this.productService.updateProduct(this.product._id, this.productForm.value).subscribe(product => {
      if (product.error)
        this.NotificationService.showError(product.error);
      if (product.data.modifiedCount && product.data.acknowledged) {
        this.NotificationService.showSuccess('Product Updated Successfully!');
        this.router.navigate(['/products']);
      }
      localStorage.removeItem('productToUpdate');
    })
  }

}
