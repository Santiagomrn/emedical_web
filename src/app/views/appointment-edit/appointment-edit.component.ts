import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { _DoctorInterface } from '../../interfaces/doctor/_doctor-interface';
import {DoctorAPIService} from '../../services/doctor/doctor-api.service';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { NotAvailable } from 'src/app/interfaces/appointment/not-available';
import {FormBuilder, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

// Interfaz para creación de cita
appointments = {
    date: null,
    turn: null,
    doctorId: null,
}

// Obtención del ID del método a modificar
id:any;
 
// Interfaz para visualizaer lista de doctores
doctor_data: _DoctorInterface;
 
// Hacemos uso de la interfaz para obtener turnos no disponibles
turn_notAvailable: NotAvailable;

// Obtenemos la cantidad de turnos disponiblesy fechas
time_available_current: Array<string>;

// Hacemos uso de las selecciones hechas por el usaurio
selected_doctor: string;
selected_turn: number;

// Interfaz para la obtención de datos 
appointment:AppointmentInterface;

// Hacemos uso de la fecha actual
appointmentDateCurrent: string;

 // Hacemos uso de formularios   
 frmappoinment;

 constructor(
   private appointmentServices:  AppointmentService,
   private doctorServices: DoctorAPIService,
   private fb: FormBuilder,
   private router: Router,
   private route: ActivatedRoute
 ) { 
   this.frmappoinment = this.fb.group({
     frdate:['',Validators.required],

     frdoctorID:['',Validators.required],
    
   });

   this. getAppointmentId();
 }

 ngOnInit(): void {
   this.getDataDoctorAppoinmentCreate();
 }

// Obtenemos todos los valores de los doctores 
getDataDoctorAppoinmentCreate = ()=>{
  this.doctorServices.getDataDoctorsAppointmentCreate().subscribe((response)=>{
    this.doctor_data = response;      

   // console.log(this.doctor_data);
  },(error) => {
    alert("Error: " + error.statusText);
  });
}


 // Realizamos la busqueda de la información correspondiente de la cita
 getAppointmentId = () =>{
  // Obtenemos el id de la cita mediante la URL
   this.id = this.route.snapshot.params['id'];    
   //console.log(this.id);
   this.appointmentServices.getAppointmentId(this.id).subscribe((response) =>{
     this.appointment = response; 

     // Respaldamos la información filtrada para guardar en el objeto
     this.appointments.date = this.appointment.date.substr(0,10);
     this.appointments.doctorId = this.appointment.doctorId;
     this.appointments.turn = this.appointments.turn;

     // Respaldamos la visualización de los datos
     this.selected_doctor = this.appointments.doctorId;

     console.log(this.selected_doctor);
     //.log(this.appointment.doctorId);
     // Respaldamos la fecha actual a la que se quiere cambiar
     this.getAppoinmentNotAvailableCurrent(this.appointments.date);

   },(error) => {
     alert("Error: " + error.statusText);
   });
 }
 
// Guardamos la cita 
saveAppointment = () => {
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
    
  // Validamos valores obtenidos   
  if((this.frmappoinment.get('frdate').value != null)&&(this.selected_turn != null)&&(this.selected_doctor != null)){
   
    // Respaldamos la información obtenida
    this.appointments.doctorId = parseInt(this.selected_doctor);
    this.appointments.turn = time_available.indexOf(this.selected_turn.toString()) + 1;
    this.appointments.date = this.frmappoinment.get('frdate').value;

   
  // console.log(this.appointments.doctorId);
   // console.log(this.appointments.turn);
   // console.log(this.appointments.date);
/*
    this.appointmentServices.createAppointment(this.appointments).subscribe((response)=>{
    },(error) => {
      alert("Error: " + error.statusText);
    });*/

  }else{
    alert("Error campos incompletos, llenar para continuar");
  }
}

// Cancela una cita 
cancelAppointmentEdit = () => {
  this.router.navigateByUrl('\dashboard_appointment');
}    

// Realizamos la obtención de fechas y turnos disponibles para las citas de la fecha actual
getAppoinmentNotAvailableCurrent = (date) =>{
  // Hacemos uso de arreglos de horas y turnos posiblemente disponibles
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  const turn_available = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  
  this.appointmentServices.getTurnNotAvailable(date).subscribe((response)=>{
      this.turn_notAvailable = response;
     // console.log(this.turn_notAvailable.turn);

        // En el caso que no existan citas se anexan todas las disponibles 
        if((Object.keys(this.turn_notAvailable).length) == 0){
            this.time_available_current = time_available;
        }else{  
    
          // Realizamos el proceso para eliminar los turnos ya ocupados        
          for (let i = 0; i < turn_available.length; i++) {
            for(let j = 0; j < (Object.keys(this.turn_notAvailable).length); j++){
              if(this.turn_notAvailable[j].turn == turn_available[i]){

                  const data_remove_turn = turn_available.indexOf(turn_available[i]);
                  if ( data_remove_turn !== -1 ) {
                    turn_available.splice(data_remove_turn, 1 );
                  }

                  //console.log(time_available);
                  const data_remove_time = time_available.indexOf(time_available[i]);
                  if( data_remove_time !== -1){         
                    time_available.splice(data_remove_time , 1);
                  }
                  
              }
            }
          }
        
          //Respaldamos los turnos que están disponible
          this.time_available_current = time_available; 
        }
   },(error) => {
      alert("Error: " + error.statusText);
  }); 
}

// Realizamos la obteneción de fechas y turnos disponibles para las citas
getAppoinmentNotAvailable = () => {
  // Hacemos uso de arreglos de horas y turnos posiblemente disponibles
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  const turn_available = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

  // Obtenemos la fecha registrada para verificar la existencia de citas
  this.appointments.date = this.frmappoinment.get('frdate').value;

  //console.log(this.appointments.date);

 // Realizamos el filtrado de los turnos que no están disponibles 
 this.appointmentServices.getTurnNotAvailable(this.appointments.date).subscribe((response)=>{
    this.turn_notAvailable = response;

      // En el caso que no existan citas se anexan todas las disponibles 
      if((Object.keys(this.turn_notAvailable).length) == 0){
          // Debido a que las citas no existen citas se mandan todas las opciones disponibles
          this.time_available_current = time_available;
      }else{
        // Arreglo que se modifica según la cita
        const turn_availabl = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

        // Realizamos el proceso para eliminar los turnos ya ocupados        
        for (let i = 0; i < turn_available.length; i++) {
          for(let j = 0; j < (Object.keys(this.turn_notAvailable).length); j++){
            if(this.turn_notAvailable[j].turn == turn_available[i]){

                // Eliminamos los turnos que están ocupados
                const data_remove = turn_available.indexOf(turn_available[i]);
                if ( data_remove !== -1 ) {
                  turn_available.splice( data_remove, 1 );
                }

                // Eliminamos las horas ocupadas según los turnos
                const data_remove_time = time_available.indexOf(time_available[i]);
                if( data_remove_time !== -1){         
                  time_available.splice(data_remove_time , 1);
                }
            }
          }
        }
        
        // Respaldamos los turnos que están disponible
        this.time_available_current = time_available;         
      }
 },(error) => {
    alert("Error: " + error.statusText);
}); 

}

}
