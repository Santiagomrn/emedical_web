import M from 'materialize-css';
import { Component } from '@angular/core';
import { MedicamentService} from "./services/medicament/medicament.service";
import { PatientsService } from "./services/patients/patients.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private MedicamentService: MedicamentService, private result_service:  PatientsService){}
  login : string;
  ngOnInit(){
    this.login = localStorage.getItem("token");
    console.log("Token : "+this.login);
  }
  title = 'medical-portal';
  
  ngAfterViewInit() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {hover: true});
  }
}

