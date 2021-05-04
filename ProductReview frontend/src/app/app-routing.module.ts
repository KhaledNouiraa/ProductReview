import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { SellerComponent } from './Component/seller/seller/seller.component';
import { AdminComponent } from './Component/admin/admin/admin.component';
import { RegistrationComponent } from './Component/auth/registration/registration.component';
import { LoginComponentComponent } from './Component/auth/login-component/login-component.component';
import { ForgetPasswordComponent } from './Component/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Component/auth/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { OrdergreetingComponent } from './Component/ordergreeting/ordergreeting.component';
import { GiverateComponent } from './Component/giverate/giverate.component';
import { AdminunverifiedproductsComponent } from './Component/adminunverifiedproducts/adminunverifiedproducts.component';
import { RatereviewComponent } from './Component/ratereview/ratereview.component';
import { OrderstatusComponent } from './Component/orderstatus/orderstatus.component';
import { RatedproductsComponent } from './Component/ratedproducts/ratedproducts.component';
import { ProductreviewsComponent } from './Component/productreviews/productreviews.component';
import { WishComponent } from './Component/wish/wish.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'products',
    pathMatch: 'full'
  },
  {path: 'products', component: DashboardComponent},
  {path: 'cart', component: CartComponent},
  {path: 'greeting', component: OrdergreetingComponent},
  {path: 'update-password/:token', component: ResetPasswordComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'login', component: LoginComponentComponent},
  {path: 'seller', component: SellerComponent},
  {path: 'wish', component: WishComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'products/rateandreview/:productId', component: GiverateComponent},
  {path: 'verifyproduct', component: AdminunverifiedproductsComponent},
  {path: 'products/info/:productId', component: RatereviewComponent},
  {path: 'products/:product', component: SellerComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'products/rateandreview/:productId/:token', component: GiverateComponent},
  {path: 'verifyproduct', component: AdminunverifiedproductsComponent},
  {path: 'products/reviews/:productId', component: RatereviewComponent},
  {path: 'products/orders', component: OrderstatusComponent},
  {path: 'ratedproducts', component: RatedproductsComponent},
  {path: 'productreviews', component: ProductreviewsComponent},
  {path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
