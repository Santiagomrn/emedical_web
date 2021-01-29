import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route : ActivatedRouteSnapshot) : boolean {
    const expectedRole = route.data.expectedRole;
    const currentRole = localStorage.getItem('role');
    // alert(currentRole + " "+ expectedRole.includes(currentRole));
    if(!this.auth.isAuthenticated() || !expectedRole.includes(currentRole)){
      this.router.navigate(['login']);
      alert("No autenticado o Rol sin permisos");
      return false;
    }
    return true;
  }
}