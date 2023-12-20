import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  { path: '', component: AddProductComponent, canActivate: [AuthGuard], },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard], },
  { path: 'add-products', component: AddProductComponent, canActivate: [AuthGuard], },
  { path: 'update-product', component: UpdateProductComponent, canActivate: [AuthGuard], },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
