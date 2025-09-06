import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './component/product-listing/product-listing.component';
import { CartComponent } from './component/cart/cart.component';
import { UserInfoComponent } from './component/user-info/user-info.component';

const routes: Routes = [  {
    path: '',
    component: ProductListingComponent,
    title: 'Products - ShopEase'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Shopping Cart - ShopEase'
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    title: 'User Information - ShopEase'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
