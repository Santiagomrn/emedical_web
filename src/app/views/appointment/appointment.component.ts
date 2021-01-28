import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
/*
  appointment:AppointmentInterface = {
    QRCode: null,
    created_at: null,
    date: null,
    id: null,
    doctorId: null,
    pathientId: null,
    
    time: null,
    turn: null,
    
    updated_at: null
  };*/
/*
  "": string,
    "created_at":string,
    "date":string,
    "doctor": string,
    "doctorId":number,
    "id":number,
    "pathient":string,
    "pathientId":number,
    "time":string,
    "turn": number,
    "updated_at":string
  */
  id:any;
  appointments:AppointmentInterface;

  // Hacemos uso de formularios   
  frmappoinment;

  constructor(
    private appointmentServices:  AppointmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.frmappoinment = this.fb.group({
      frturn: ['',Validators.required],
      frdate:['',Validators.required],
      frtime: ['',Validators.required],
    });

  }

  ngOnInit(): void {
    this. getAppointmentId();
  }

  // Realizamos la busqueda de la información correspondiente de la cita
  getAppointmentId = () =>{

 // Obtenemos el id de la cita mediante la URL
    this.id = this.route.snapshot.params['id'];    
    console.log(this.id);

    this.appointmentServices.getAppointmentId(this.id).subscribe((response) =>{
      this.appointments = response; 

      this.appointments.date = this.appointments.date.substr(0,10);


      /*

      
      dia = document.getElementById("dia").value;
mes = document.getElementById("mes").value;
annio = document.getElementById("annio").value;
fecha_texto = annio+"-"+mes+"-"+dia;
ms = Date.parse(fecha_texto);
fecha = new Date(ms);
      */
    },(error) => {
      alert("Error: " + error.statusText);
    });
  }

  // Para obtener todos los datos (null,true)
  // Para obtener datos especificos mediante id (id,false)getAppointment = (id,data:boolean) 

 
/*
  getNumber = () => {
    this.appointmentService.getAppointment("number", false).subscribe((response) => {  
        this.appointments = response;
      }, (error) => {
        alert("Error: " + error.statusText);
      });
    
    };
    
    saveAppointmentCreate = () => {
      if(this.editing){
        this.appointmentService.saveAppointment(this.appointment).subscribe((response) =>{
          this.router.navigateByUrl('\home_patients');
          alert('Cita Actualizada');
        },(error) => {
            alert("Error: " + error.statusText);
        });

      }else{
        this.appointmentService.saveAppointment(this.appointment).subscribe((response) =>{
            this.router.navigateByUrl('\home_patients');
            alert('Cita Programada');
        },(error) => {
            alert("Error: " + error.statusText);
        });
      }
    }
    
    

*/

// Guardamos la cita 
saveAppointment = () => {

}

// Cancela una cita 
cancelAppointment = () => {
  this.router.navigateByUrl('\dashboard_appointment');
}    

//document.getElementById("fecha").value = "2018-03-08";

ngAfterViewInit() {
 //document.getElementById("date").value = 
}
}
