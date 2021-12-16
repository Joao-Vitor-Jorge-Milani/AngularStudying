import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICart } from 'src/app/components/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carts: ICart[] = [
    // //TODO REMOVER TESTE
    // {name: "TESTE", price: 5.90, qnt: 1, qntBuy:1, id: 0}
  ];
  
  constructor(private snackBar: MatSnackBar) { }

  addCart(cart: ICart): void {
    if(!this.carts.find(el => el == cart)){
      this.carts.push(cart)
    }    
  }

  getCarts(): ICart [] {
    return this.carts
  }

  removeCart(cart: ICart) :void {
    this.carts.splice(this.carts.indexOf(cart), 1)
  }

  cleanCart():void {
    this.carts = [];
  }

  isCartEnable(): boolean {
    return this.carts.length > 0
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }
}
