import { ProductService } from './../product/product.service';
import { CartService } from 'src/app/auth/cart/cart.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/components/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrlViaCep = environment.baseUrlViaCep
  baseUrl = environment.baseUrl
  private header = new HttpHeaders({'Authorization': `Bearer ${window.localStorage.getItem("token")}`});
  
  address!: {
    zipcode: string,
    street: string,
    number:   number,
    state: string,
    city: string,
    neighbor: string
  }

  payment!: {
    name: string,
    card: string,
    cv:   number,
    date: string
  }

  constructor(private http: HttpClient,
              private cartService: CartService,
              private productService: ProductService,
              private snackBar: MatSnackBar
              ) { }

  consultCep(value: any):Observable<any>{
    return this.http.get(`${this.baseUrlViaCep}/${value}/json`)
  }

  checkout(address: any, payment: any){
    this.updateProductsInStock()
    this.postSale(address, payment)
  }

  postSale(address: any, payment: any){
    let sale = {
      "address": address,
      "payment": payment,
      "sales": this.cartService.getCarts()
    }

    this.http.post<any>(`${this.baseUrl}/sales`, sale, {headers: this.header}).subscribe({
      next: (data) => {
        console.log("checkout.service.postSale(): Sale registred")
        console.log(data)
      },
      error: (error) => {
        this.handleError("checkout.service.postSale(): ERRO: Problema ao cadastrar venda: ", error)
      }
    })
  }

  updateProductsInStock():void{
    this.cartService.getCarts().forEach(
      el => {      
        let body = {"qnt": el.qnt - el.qntBuy!}

        this.productService.patch(el.id, body).subscribe({
          next: data => {
            console.log("checkout.service.updateProductInStock(): Produto atualizado!")
            console.log(data)
          },
          error: error => {
            this.handleError("Nao foi possivel atualizar quantidade de produtos em estoque", error)
          }
        })
      }
    )
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 10000,
      horizontalPosition: "center",
      verticalPosition: "top"            
    })
  }

  handleError(_message: string, _error: HttpErrorResponse):void {
    let {status, message, error, } = _error;
    this.showMessage(`${_message}: ${status} ${message} ${error}`)
  }

}
