import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-appointment-doctor',
  templateUrl: './list-appointment-doctor.component.html',
  styleUrls: ['./list-appointment-doctor.component.css']
})
export class ListAppointmentDoctorComponent implements OnInit {

  // Utilizamos una variable que contiene la fecha actual
  current_date:string;
  
   // Hacemos uso de la interfaz de citas
   appointments:AppointmentInterface;

    /* Paginación */
  response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['turn','patient_info','date','time','crud'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private appointmentService:  AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
     // Hacemos una arreglo para el mes 
     const month_form = ["01","02","03","04","05","06","07","08","09","10","11","12"];

     // Obtenemos la fecha actual
     const year = (new Date()).getFullYear();
     const month = (new Date()).getMonth();
     const day = (new Date()).getDate();
 
     // Respaldamos la fecha actual  
     this.current_date = year + '-' + month_form[month] + '-' + (day+1);
 
   }

  ngOnInit(): void {
    this.getAppointmentDoctorAgent();
  }

  // Obtenemos todas las citas del doctor
  getAppointmentDoctorAgent = () => 
  {
      // Hacemos uso del servicio para la obtención de datos de la interfaz
      this.appointmentService.getAppointmentDoctor().subscribe((response)=>{
        // Respaldamos el resultado obtenido
        this.response_resultados = response;
        
        console.log(this.response_resultados);
        // Realizamos paginación correspondiente
        this.dataSource = new MatTableDataSource(this.response_resultados);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);

      },(error) => {
        // Mostramos mensaje de error
        Swal.fire('Error',error.statusText,'question')
      });
  }
}
