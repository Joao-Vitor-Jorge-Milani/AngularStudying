
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  handleError(_message: string,_error: HttpErrorResponse):void {
    let {status, message, error, } = _error;
    this.showMessage(`${_message}: ${status} ${message} ${error}`)
  }
  
  create(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user)
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user)
  }

  logoff(): void {
    window.localStorage.removeItem("token")
    this.router.navigate(['/'])
    window.location.reload();
  }

}
