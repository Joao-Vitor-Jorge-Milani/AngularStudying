import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/access/login/login.component';
import { RegisterComponent } from '../components/access/register/register.component';
import { ProductComponent } from '../components/manage/product/product.component';
import { ProductTableComponent } from '../components/manage/product-table/product-table.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavUserComponent } from './nav-user/nav-user.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { SideNavComponent } from './template/side-nav/side-nav.component';
import { ProductCreateComponent } from '../components/manage/product-create/product-create.component';
import { ProductUpdateComponent } from '../components/manage/product-update/product-update.component';
import { ShopTableComponent } from '../components/shop/shop-table/shop-table.component';
import { CartComponent } from '../components/shop/cart/cart.component';
import { CheckoutComponent } from '../components/shop/checkout/checkout.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    NavUserComponent,
    NavHomeComponent,
    FooterComponent,
    HeaderComponent,
    SideNavComponent,
    ProductTableComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ShopTableComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forChild()
  ]
})
export class ViewModule { }
