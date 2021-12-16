import { CheckoutComponent } from './components/shop/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ViewModule } from './view/view.module';
import { NavUserComponent } from './view/nav-user/nav-user.component';
import { RegisterComponent } from './components/access/register/register.component';
import { LoginComponent } from './components/access/login/login.component';
import { NavHomeComponent } from './view/nav-home/nav-home.component';
import { ProductComponent } from './components/manage/product/product.component';
import { ProductCreateComponent } from './components/manage/product-create/product-create.component';
import { ProductUpdateComponent } from './components/manage/product-update/product-update.component';
import { ShopTableComponent } from './components/shop/shop-table/shop-table.component';

const routes: Routes = [
  {
    path: "",
    component: NavHomeComponent,
    children: [
      {
        path: "",
        component: ProductComponent
      },
      {
        path: "products/create",
        component: ProductCreateComponent
      },
      {
        path: "products/update/:id",
        component: ProductUpdateComponent
      },
      {
        path: "shop",
        component: ShopTableComponent
      },
      {
        path: "shop/checkout",
        component: CheckoutComponent
      }
    ],
    canActivate: [ AuthGuard ]
  },
  {
    path: "",
    component: NavUserComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ViewModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
