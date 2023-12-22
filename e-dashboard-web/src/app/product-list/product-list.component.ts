import { Component } from '@angular/core';
import { Product } from '../interface/product.interface';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService, ConfirmationService]
})
export class ProductListComponent {
  products!: Product[];
  product!: Product;
  productDialog: boolean = false;

  constructor(private NotificationService: NotificationService, private productService: ProductService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    this.productService.getProductList().subscribe(product => {
      if (product.error)
        this.NotificationService.showError(product.error);
      if (!product.data) return;
      this.products = product.data;
    })
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'INSTOCK';
    }
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
    localStorage.setItem('productToUpdate', JSON.stringify(this.product));
    this.router.navigate(['/update-product']);
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!product._id) return;
        this.productService.deleteProduct(product._id).subscribe(product => {
          if (product.error)
            this.NotificationService.showError(product.error);
          if (product.data.deletedCount && product.data._id) {
            this.NotificationService.showSuccess('Product deleted successfully!');
            this.products = this.products.filter((val) => val._id !== product.data._id);
          }
        })
      }
    });
  }

}
