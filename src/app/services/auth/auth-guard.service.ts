import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { iif } from 'rxjs';
import { AuthService } from './auth.service';
/**
 * Servicio de retorno al login en caso de no estar logueado
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
/**
 * Constructor
 * @param auth Se importa el servicio de autenticación 
 * @param router  Se importa el router
 */
  constructor(public auth: AuthService, public router: Router) { }
  // Provee un servicio de redirección verificando si existe un token 
  /**
   * Función que activa el login en caso de no estar logueado
   * 
   * @returns {boolean} Se valida si el usuario está logueado, en caso de negativa se reedirecciona 
   */
  canActivate() : boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
