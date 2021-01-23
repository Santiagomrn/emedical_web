import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  // Provee un servicio para verificar el token almacenado
  public isAuthenticated() : boolean {
    const token = localStorage.getItem('token');
    if(token != "undefined"){
      console.log("Servicio AUTH : TRUE");
      return true;
    }
    console.log("Servicio AUTH : FALSE");
    return false;
  }
}
