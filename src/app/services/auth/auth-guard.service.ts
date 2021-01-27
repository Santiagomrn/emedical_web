import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { iif } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  // Provee un servicio de redirección verificando si existe un token 
  canActivate() : boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
