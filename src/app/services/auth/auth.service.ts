import { Injectable } from '@angular/core';

/**
 * Servicio para saber el estado de inicio de sesión del usuario
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
/**
 * Constructor 
 */
  constructor() { }
  // Provee un servicio para verificar el token almacenado
  /**
   * Función para acceder al token y saber el estado de Login
   * @returns boolean 
   */
  public isAuthenticated() : boolean {
    const token = localStorage.getItem('token');
    if(token != "0"){
      return true;
    }
    return false;
  }
}
