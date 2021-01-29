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

@Component({
  selector: 'app-dashbord-appoinment',
  templateUrl: './dashbord-appoinment.component.html',
  styleUrls: ['./dashbord-appoinment.component.css']
})
export class DashbordAppoinmentComponent implements OnInit {

  // Utilizamos una variable que contiene la fecha actual
  current_date: string;

  // Hacemos uso de la interfaz de citas
  appointments: AppointmentInterface[];

  /* Paginación */
  response_resultados: any[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['turn', 'date', 'time', 'crud'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public myAngularxQrCode: string = null;

  constructor(
    private appointmentService: AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
    
  ) {
    
    // Hacemos una arreglo para el mes 
    const month_form = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    // Obtenemos la fecha actual
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth();
    const day = (new Date()).getDate();
    this.myAngularxQrCode=null;
    // Respaldamos la fecha actual  
    this.current_date = year + '-' + month_form[month] + '-' + (day + 1);

  }

  ngOnInit(): void {
    this.getAppointments();
  }

  // Obtención del código QR
  getCodeQR = (id) => {
    this.getAppointmentQRLink(id);
  }
  //delete MedicalApp
  deleteMedicalApp = (id) => {
    console.log(id);
    this.appointmentService.deleteAppointment(id).subscribe((response) => {
      // Mostramos mensaje de cita eliminada
      Swal.fire({ icon: 'error', title: 'Cita eliminada!', showConfirmButton: false, timer: 1250 })
      this.getAppointments();
    }, (error) => {
      // Mostramos mensaje de error
      Swal.fire('Error', error.statusText, 'question')

    })
  }


  // Obtenemos todas las citas mediante el ID
  getAppointments = () => {
    // Hacemos uso del servicio para la obtención de datos de la interfaz
    this.appointmentService.getAppointment().subscribe((response) => {
      // Respaldamos el resultado obtenido
      this.appointments=response;
      // Realizamos paginación correspondiente
      this.dataSource = new MatTableDataSource(this.appointments);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
   
    }, (error) => {
      // Mostramos mensaje de error
      Swal.fire('Error', error.statusText, 'question')
    });

    
  }
  getAppointmentById =(id) =>{
      // Hacemos uso del servicio para la obtención de datos de la interfaz
      this.appointmentService.getAppointmentQRLink(id).subscribe((response) => {
        // Respaldamos el resultado obtenido
        console.log(this.response_resultados);
        
      }, (error) => {
        // Mostramos mensaje de error
        Swal.fire('Error', error.statusText, 'question')
      });
  }
  getAppointmentQRLink = (id) => {
    // Hacemos uso del servicio para la obtención de datos de la interfaz
    this.appointmentService.getAppointmentQRLink(id).subscribe((response) => {
      // Respaldamos el resultado obtenido
      this.response_resultados = response;
      this.myAngularxQrCode=this.response_resultados['link'];
      console.log(this.response_resultados['link']);

    }, (error) => {
      // Mostramos mensaje de error
      Swal.fire('Error', error.statusText, 'question')
    });
  }
}
