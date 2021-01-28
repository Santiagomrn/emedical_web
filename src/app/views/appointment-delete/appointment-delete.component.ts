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
  selector: 'app-appointment-delete',
  templateUrl: './appointment-delete.component.html',
  styleUrls: ['./appointment-delete.component.css']
})
export class AppointmentDeleteComponent implements OnInit {

  // Creamos variable para obtener el ID
  id: any;

  constructor(
    private appointmentService:  AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
     // Obtenemos el id de la cita mediante la URL
   this.id = this.route.snapshot.params['id'];    
    this.deleteAppointmentId(this.id);
  }

   // Eliminamos la respectiva cita
deleteAppointmentId = (id) =>{
  console.log(id);
  this.appointmentService.deleteAppointment(id).subscribe((response)=>{
    // Mostramos mensaje de cita creada
    Swal.fire({icon: 'error',title: 'Cita eliminada!',showConfirmButton: false,timer: 1250})

    // Redireccionamos
    this.router.navigateByUrl('\dashboard_appointment');    
  },(error) => {
     // Mostramos mensaje de error
     Swal.fire('Error',error.statusText,'question')
     // Redireccionamos
    this.router.navigateByUrl('\dashboard_appointment'); 
  });
  
}
}
