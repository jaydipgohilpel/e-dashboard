import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: AddProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'add-products', component: AddProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
