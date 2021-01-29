import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
/**
 * Servicio para saber el rol del usuario 
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
/**
 * Constructor
 * @param auth Se importa el servicio de autenticación
 * @param router  Se importa el router para la reedirección
 */
  constructor(public auth: AuthService, public router: Router) { }
/**
 * Función para verificar si el usuario tiene el rol necesario para acceder
 * a la página que está trantando de ingresar
 * @param {route} 
 * @returns {boolean} Se retorna si el usuario cuenta con el rol correcto
 */
  canActivate(route : ActivatedRouteSnapshot) : boolean {
    const expectedRole = route.data.expectedRole;
    const currentRole = localStorage.getItem('role');
    if(!this.auth.isAuthenticated() || !expectedRole.includes(currentRole)){
      this.router.navigate(['login']);
      alert("No autenticado o Rol sin permisos");
      return false;
    }
    return true;
  }
}
