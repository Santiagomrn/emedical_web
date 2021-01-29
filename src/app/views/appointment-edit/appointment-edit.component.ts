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
import Swal from 'sweetalert2';

/**
 * Componente de angular
 */
@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

/**
 * Valores para la creación de citas nuevas
 */
appointments = {
    date: null,
    turn: null,
    doctorId: null,
}

/**
 * Valor para la obtención del ID del usuario
 */
id:any;
 
/**
 * Valor para la visualización de los datos de Doctores recibidos por una API
 */
doctor_data: _DoctorInterface;
 
/**
 * Valor para la visualización de los datos de Turnos no disponibles recibidos por la API
 */
turn_notAvailable: NotAvailable;

/**
 * Valor de una arreglo para la lógica de horas y turnos disponibles
 */
time_available_current: Array<string>;

/**
 * Valor para determinar la selección del usuario(Paciente) del doctor elegido
 */
selected_doctor: string;

/**
 * Valor para determinar la selección del usuario(Paciente) del turno elegido
 */
selected_turn: string;

/**
 * Valor para la visualización de los datos de Pacientes recibidos por una API
 */
appointment:AppointmentInterface;

/**
 * Valor para obtener la fecha actual
 */
appointmentDateCurrent: string;

/**
 * Valor para la creación del formulario para la obtención de la fecha que el paciente desee
 */  
frmappoinment;

/**
 * Constructor para utilizar modulos importados
 * @param {AppointmentService} appointmentServices consumo del servicio de citas
 * @param {DoctorAPIService} doctorServices consumo del servicio de doctores
 * @param {FormBuilder} fb consumo del modulo para formularios
 * @param {Router} router  consumo del modulo para redireccionar
 * @param {ActivatedRoute} route consumo del modulo obtención de ID
*/
constructor(
   private appointmentServices:  AppointmentService,
   private doctorServices: DoctorAPIService,
   private fb: FormBuilder,
   private router: Router,
   private route: ActivatedRoute
 ) { 
   this.frmappoinment = this.fb.group({
     frdate:['',Validators.required], 
   });
   this. getAppointmentId();
 }

 /**
   * Método de angular
   */
 ngOnInit(): void {
   this.getDataDoctorAppoinmentCreate();
 }

/**
 * Método para la obtención de datos de los doctores disponibles
 * @returns los datos de los doctor mediante una API
 */ 
getDataDoctorAppoinmentCreate = ()=>{
  this.doctorServices.getDataDoctorsAppointmentCreate().subscribe((response)=>{
    this.doctor_data = response;      
  },(error) => {
    Swal.fire('Error',error.statusText,'question')
  });
}


 // Realizamos la busqueda de la información correspondiente de la cita
 getAppointmentId = () =>{
  // Arreglo de datos de horas disponibles
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  
  // Obtenemos el id de la cita mediante la URL
   this.id = this.route.snapshot.params['id'];    
   //console.log(this.id);
   this.appointmentServices.getAppointmentId(this.id).subscribe((response) =>{
     this.appointment = response; 

     // Respaldamos la información filtrada para guardar en el objeto
     this.appointments.date = this.appointment.date.substr(0,10);
     this.appointments.doctorId = this.appointment.doctorId;
     this.appointments.turn = this.appointment.turn;

     // Respaldamos la visualización de los datos
     this.selected_doctor = this.appointments.doctorId.toString();
     this.selected_turn =  time_available[this.appointments.turn-1];
    
     //console.log(this.selected_doctor);
    // console.log(this.selected_turn);
   //  console.log(time_available[this.selected_turn]);

     // Respaldamos la fecha actual a la que se quiere cambiar
     this.getAppoinmentNotAvailableCurrent(this.appointments.date,this.appointments.turn);

   },(error) => {
     // Mostramos mensaje de error
     Swal.fire('Error',error.statusText,'question')
   });
 }


 
 
// Guardamos la cita 
saveAppointment = () => {
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
    
  // Validamos valores obtenidos   
  if((this.frmappoinment.get('frdate').value != null)&&(this.selected_turn != null)&&(this.selected_doctor != null)){
   
    // Obtenemos el id de la cita mediante la URL
   this.id = this.route.snapshot.params['id'];   

    // Respaldamos la información obtenida
    this.appointments.doctorId = parseInt(this.selected_doctor);
    this.appointments.turn = time_available.indexOf(this.selected_turn.toString()) + 1;
    this.appointments.date = this.frmappoinment.get('frdate').value;  


   console.log(this.appointments.doctorId);
   console.log(this.appointments.turn);
   console.log(this.appointments.date);

   this.appointmentServices.editAppointment(this.id,this.appointments).subscribe((response)=>{

    // Mostramos mensaje de cita actualizada
    Swal.fire({icon: 'info',title: 'Cita actualiza!',showConfirmButton: false,timer: 1250})

       // Redireccionamos
    this.router.navigateByUrl('\dashboard_appointment');  
   },(error) => {
    // Mostramos mensaje de error
    Swal.fire('Error',error.statusText,'question')
  });

   
  }else{
     // Generamos alerta para verificación de campos ya que existe alguno vacio
     Swal.fire({icon: 'error',title: 'Oops...', text: 'Campos incompletos!'})
  }
}

// Cancela una cita 
cancelAppointmentEdit = () => {
  this.router.navigateByUrl('\dashboard_appointment');
}    

// Realizamos la obtención de fechas y turnos disponibles para las citas de la fecha actual
getAppoinmentNotAvailableCurrent = (date,id_current) =>{
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

                if(turn_available[i] == id_current){
                  ;
                }else{
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
          }
        
          //Respaldamos los turnos que están disponible
          this.time_available_current = time_available; 
        }
   },(error) => {
      // Mostramos mensaje de error
     Swal.fire('Error',error.statusText,'question')
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
    // Mostramos mensaje de error
    Swal.fire('Error',error.statusText,'question')
}); 

}

}
