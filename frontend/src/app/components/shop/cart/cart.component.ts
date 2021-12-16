import { CartService } from './../../../auth/cart/cart.service';
import { ICart } from './../../cart.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: ICart[] = [];
    
  constructor(private cartService: CartService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts()
  }  

  buyPrice(cart: ICart): number{
    return cart.price * cart.qntBuy!
  }

  cleanCart():void{
    this.cartService.cleanCart();
    this.ngOnInit()
  }

  remove(row: ICart):void{    
    this.cartService.removeCart(row)
  }

  isEnable(): boolean {
    return this.cartService.isCartEnable()
  }

  onSubmit(){
    this.router.navigate(['/shop/checkout'])
  }
}
