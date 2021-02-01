import M from 'materialize-css';
import { Component,OnInit } from '@angular/core';
import { MedicamentService} from "./services/medicament/medicament.service";
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from "./services/patients/patients.service";
/**
 * Componente principal
 * 
 * 
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /**
   * Constructor de componente
   * @param MedicamentService 
   * @param route 
   * @param router 
   * @param result_service 
   */
  constructor(private MedicamentService: MedicamentService, private route: ActivatedRoute, private router: Router,
    private result_service:  PatientsService  
    ){
    }
    /**
     * Variable donde se guarda el estado de Login
     *  @param {string}
     */
  login : string ;
  /**
   * Variable que almacena el rol que tiene el usuario
   * @param {string}
   */
  isRole : string;
  /**
   * Inicializador
   */
ngOnInit(){
    // Modificar logout cuando ya se tiene la sesión iniciada. 
    // Verificar qué devuelve administrador
    // Proteger pestañas desde el navbar
    // Proteger vistas desde el router
    this.login = localStorage.getItem("token");
    if( this.login === '' || this.login === '0'){
      localStorage.setItem("token", '0');
      this.login = '0';
    }
    this.isRole = this.localStorageItem();
  }
  /**
   * Almacenar título de la aplicación
   * 
   */
  title = 'medical-portal';
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
    localStorage.setItem("role", '0');
    // Reedirigir 
    const _url= '/login?role='+role;
    // Redireccionamiento
    this.router.navigateByUrl(_url);
  }
  /**
   * Variables necesarias para los componentes de Materialize CSS
   */
  ngAfterViewInit() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {hover: true});
  }
}

