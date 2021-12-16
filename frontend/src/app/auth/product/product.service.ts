import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../components/product.model'
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.baseUrl}/products`;
  private header = new HttpHeaders({'Authorization': `Bearer ${window.localStorage.getItem("token")}`});

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 10000,
      horizontalPosition: "center",
      verticalPosition: "top"            
    })
  }

  handleError(_message: string,_error: HttpErrorResponse):void {
    let {status, message, error, } = _error;
    this.showMessage(`${_message}: ${status} ${message} ${error}`)
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product, {headers: this.header})
  }

  read(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}`, {headers: this.header})
  }

  readById(id: number): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<IProduct>(url, {headers: this.header})
  }

  update(produto: IProduct): Observable<IProduct> {
    const url = `${this.baseUrl}/${produto.id}`
    return this.http.put<IProduct>(url, produto, {headers: this.header})
  }

  delete(id: number): Observable<any>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete(url, {headers: this.header})
  }

  patch(id: number, body: object): Observable<any>{
    const url = `${this.baseUrl}/${id}`
    return this.http.patch(url ,body, {headers: this.header})
  }

}
