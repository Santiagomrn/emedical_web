import M from 'materialize-css';
import { Component } from '@angular/core';
import { MedicamentService} from "./services/medicament/medicament.service";
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from "./services/patients/patients.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private MedicamentService: MedicamentService, private route: ActivatedRoute, private router: Router,
    private result_service:  PatientsService  
    ){}
  login : string ;
  isRole : string;
ngOnInit(){
    // Modificar logout cuando ya se tiene la sesión iniciada. 
    // Verificar qué devuelve administrador
    // Proteger pestañas desde el navbar
    // Proteger vistas desde el router
    // alert("LOGIN!");
    this.login = localStorage.getItem("token");
    console.log("Token : "+this.login);
    if( this.login === '' || this.login === '0'){
      localStorage.setItem("token", '0');
      this.login = '0';
    }
    this.isRole = this.localStorageItem();
  }
  title = 'medical-portal';
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
  logOut(){
    // obtener role
    let role = localStorage.getItem("role");
    // Cerrar sesión
    localStorage.setItem("token", '0');
    localStorage.setItem("role", '0');
    // Reedirigir 
    let _url= '/login?role='+role;
    this.router.navigateByUrl(_url);
    
  }
  ngAfterViewInit() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {hover: true});
  }
}

