import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * Componente Navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  /** Constructor */
  constructor(private route: ActivatedRoute, private router: Router) { }
  /**
   * Método Angular
   */
  ngOnInit(): void {
    this.login = localStorage.getItem("token");
    if( this.login === '' || this.login === '0'){
      localStorage.setItem("token", '0');
      this.login = '0';
    }
    this.isRole = this.localStorageItem();
  }
    /**
     * Variable donde se guarda el estado de Login
     *  @param {string}
     */
    login : string = "1" ;
    /**
     * Variable que almacena el rol que tiene el usuario
     * @param {string}
     */
    isRole : string;
  /**
   * Función para cerrar sesión
   * 
   * Retorna al login al cerrar sesión
   */

    logOut(){
    
      // obtener role
      let role = localStorage.getItem("role");
      // Cerrar sesión
      localStorage.setItem("token", '0');
      localStorage.setItem("login", '0');
      localStorage.setItem("role", '0');
      // Reedirigir 
      const _url= '/login?role='+role;
      this.login = "0";
      // Redireccionamiento
      this.router.navigateByUrl(_url);
    }
      /**
   * Función que devuelve el estado 
   * @returns {string} Retorna el valor del rol actual
   */
  public localStorageItem() : string {
    let role = localStorage.getItem("role");
    if(role === "pathient"){
      return 'pathient';
    }
    if(role === "doctor"){
      return 'doctor';
    }
    if( role === 'manager'){
      return 'manager';
    }
  }
}
