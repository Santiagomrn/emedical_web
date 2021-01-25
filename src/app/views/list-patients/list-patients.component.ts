import M from 'materialize-css';
import {AfterViewInit,ElementRef, OnInit, Component, ViewChild} from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder,FormControl, Validators, FormsModule} from '@angular/forms';
import { threadId } from 'worker_threads';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients_search:PatientsInterface= {
    id: null,
    name: null,
    lastName: null,
    phone: null,
    email: null,
    emergencyPhone: null,
    password: null,
    birthdate: null,
    created_at: null,
    updated_at: null
  }

  patients:PatientsInterface[];
  valuePatients:string;
  total:number;
  searchForm;

  /* Paginación */
  public response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','lastName','email','birthdate','phone','emergencyPhone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private result_service:  PatientsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.searchForm = this.formBuilder.group({
        query: ''
      });
      this.total = 0;
     }

  ngOnInit(): void {
  // Obtenemos el listado de todos los pacientes
  this.get_patients();
  }

  // Obtenemos los pacientes registrados
  get_patients = () =>{
     // Hacemos uso del servicio para la obtención de datos de la interfaz
     this.result_service.getDataPatients('all','1').subscribe((response:PatientsInterface[]) =>{
     // Respaldamos el resultado obtenido
     this.response_resultados = response;
     console.log(response);

     // Realizamos paginación correspondiente
     this.dataSource = new MatTableDataSource(this.response_resultados);
     this.dataSource.paginator = this.paginator;
     console.log(this.dataSource);
     
     // Respaldamos los datos a utilizar
     this.patients = response;
     
    }, (error) => {
      alert("Error: " + error.statusText);
    });
}

// Se hace uso de filtrado para encontrar al paciente
get_patients_email = (data) =>{

  // Validamos a que el formulario tenga texto
  if(data){
    console.log(data);
    
  }

}


}

