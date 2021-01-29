import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

/**
 * Componente de angular
 */
@Component({
  selector: 'app-dashbord-appoinment',
  templateUrl: './dashbord-appoinment.component.html',
  styleUrls: ['./dashbord-appoinment.component.css']
})
export class DashbordAppoinmentComponent implements OnInit {
/**
 * Valor obtener la fecha actual 
 */
current_date:string;

/**
 * Valor para la visualización de los datos de Citas recibidos por una API
 */
appointments:AppointmentInterface;

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
displayedColumns: string[] = ['turn','date','time','crud'];

/**
 * Valor para realizar la petición de hacer paginación
 */
@ViewChild(MatPaginator) paginator: MatPaginator;

 /**
   * Constructor para utilizar modulos importados
   * @param {AppointmentService} appointmentService consumo del servicio de citas
   * @param {FormBuilder} form consumo del modulo para formularios
   * @param {Router} router  consumo del modulo para redireccionar
   * @param {ActivatedRoute} route consumo del modulo obtención de ID
   */
  constructor(
    private appointmentService:  AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){ 
    const month_form = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth();
    const day = (new Date()).getDate();
    this.current_date = year + '-' + month_form[month] + '-' + (day+1);
  }

  /**
   * Método de angular
   */
  ngOnInit(): void {
    this.getAppointment();
  }

  /**
   * Generamos un código QR
   */
  getCodeQR = () =>{
 
  }

  /** 
  * Método para obtenet un listado de citas de paciente mediante el consumo de una API Appoinment.
  * @return del resultado de las citas otorgado por la API
  */
  getAppointment = () => 
  {
    this.appointmentService.getAppointment().subscribe((response)=>{
      this.response_resultados = response;
      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    },(error) => {
      Swal.fire('Error',error.statusText,'question')
    });
  }
}
