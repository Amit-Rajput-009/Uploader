import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private auth:AuthService) { 

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   let verified = false;
    // this.auth.verifyUser().subscribe((response)=>{
    //  verified = response
    //   return response;
    // });

    let verified = localStorage.getItem('token');
    
    if (verified) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
