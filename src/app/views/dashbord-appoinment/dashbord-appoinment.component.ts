import M from 'materialize-css';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';

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
 * Valor para visualizar el código QR
 */
myAngularxQrCode: string = null;


/**
 * Valor para la visualización de los datos de Citas recibidos por una API
 */
appointments:AppointmentInterface[];

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
   * @param {MatDialog} dialog consumo del modulo para el código QR
   */
  constructor(
    private appointmentService: AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    
  ) {
    const month_form = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth();
    const day = (new Date()).getDate();
    this.myAngularxQrCode=null;
    this.current_date = year + '-' + month_form[month] + '-' + (day + 1);
  }

  /**
   * Método de angular
   */
  ngOnInit(): void {
    this.getAppointments();
  }

   /**
   * Generamos un código QR
   */
  getCodeQR = (id) => {
    this.getAppointmentQRLink(id);
  }
  
  /**
   * Método que elimina una cita
   * @param id para eliminar una cita mediante un DELETE
   */
  deleteMedicalApp = (id) => {
    this.appointmentService.deleteAppointment(id).subscribe((response) => {
      Swal.fire({ icon: 'error', title: 'Cita eliminada!', showConfirmButton: false, timer: 1250 })
      this.getAppointments();
    }, (error) => {
      Swal.fire('Error', error.statusText, 'question')
    });
  }

  /** 
  * Método para obtener un listado de citas de paciente mediante el consumo de una API Appoinment.
  * @return del resultado de las citas otorgado por la API
  */
  getAppointments = () => {
    this.appointmentService.getAppointment().subscribe((response) => {
      this.appointments=response;
      this.response_resultados = this.appointments;
      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      Swal.fire('Error', error.statusText, 'question')
    });
  }

/**
 * Método para la obtención del código QR en una API
 * @param {string} id de la cita que se hará código QR
 * @return el código QR de la cita según el id
 */
  getAppointmentById =(id) =>{
      this.appointmentService.getAppointmentQRLink(id).subscribe((response) => {
      }, (error) => {
        Swal.fire('Error', error.statusText, 'question')
      });
  }

  /**
   * Método que obtiene el código QR para visualizarlo en la vista 
   * @param {string} id de la cita que se hará código QR
   * @return obtiene los resultado de la vista que se visualizan en la tabla
   */
  getAppointmentQRLink = (id) => {
    this.appointmentService.getAppointmentQRLink(id).subscribe((response) => {
      this.response_resultados = response;
      this.myAngularxQrCode=this.response_resultados['link'];
    }, (error) => {
      Swal.fire('Error', error.statusText, 'question')
    });
  }
}
