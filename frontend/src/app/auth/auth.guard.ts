import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) {}

  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  canActivate(): boolean {
      if(window.localStorage.getItem("token") != null){
        return true;
      }
      
      this.route.navigate(['login'])
      return false;      
    }
  
}
