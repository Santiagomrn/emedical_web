import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DoctorAPIService } from "../../services/doctor/doctor-api.service";
import { _DoctorInterface } from "../../interfaces/doctor/_doctor-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

/**
 * Componente de angular
 */
@Component({
  selector: 'app-list-appoinrment-patients',
  templateUrl: './list-appoinrment-patients.component.html',
  styleUrls: ['./list-appoinrment-patients.component.css']
})
export class ListAppoinrmentPatientsComponent implements OnInit {
/**
 * Valor obtener la fecha actual 
 */
current_date:string;
  
/**
 * Valor para la visualización de los datos del doctor por una API
 */
doctors:_DoctorInterface[];

/**
 * Valor para el resultado de la páginación
 */
response_resultados: any[];        

/**
 * Valor para obtener la tabla que se visualizará
 */
dataSource: MatTableDataSource<any>;

/**
 * Valor para determinar las columnas de la tabla a visualizar
 */
displayedColumns: string[] = ['name','lastName','email','phone','crud'];

/**
 * Valor para realizar la petición de hacer paginación
 */
@ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructor para utilizar modulos importados
   * @param {DoctorAPIService} appointmentService consumo del servicio de doctores
   * @param {FormBuilder} form consumo del modulo para formularios
   * @param {Router} router  consumo del modulo para redireccionar
   * @param {ActivatedRoute} route consumo del modulo obtención de ID
   */
  constructor(
    private doctorService:  DoctorAPIService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
     const month_form = ["01","02","03","04","05","06","07","08","09","10","11","12"];
     const day_form = ["01","02","03","04","05","06","07","08","09"];
     const year = (new Date()).getFullYear();
     const month = (new Date()).getMonth();
     const day = (new Date()).getDate();
     if(day < 10){
      this.current_date = year + '-' + month_form[month] + '-' + day_form[day];
     }else{
      this.current_date = year + '-' + month_form[month] + '-' + (day+1);
     }
     this.getInfoDoctor();
  }
  /**
   * Método de angular
   */
  ngOnInit(): void {
  }

  /** 
  * Método para obtener las citas asiganadas al doctor mediante el consumo de una API Appoinment.
  * @return del resultado de las citas otorgadas por la API
  */
 getInfoDoctor = () => 
 {
     this.doctorService.getInfoDoctors().subscribe((response)=>{
       this.doctors = response;
       this.response_resultados = this.doctors;
       this.dataSource = new MatTableDataSource(this.response_resultados);
       this.dataSource.paginator = this.paginator;
     },(error) => {
       Swal.fire('Error',error.statusText,'question')
     });
 }
}
