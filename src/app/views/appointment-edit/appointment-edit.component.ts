import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { _DoctorInterface } from '../../interfaces/doctor/_doctor-interface';
import { DoctorAPIService} from '../../services/doctor/doctor-api.service';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { NotAvailable } from 'src/app/interfaces/appointment/not-available';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

/**
 * Método que obtiene la cita correspondiente al turno que el paciente eligio
 * @returns los datos de la cita mediante una API
 */
 getAppointmentId = () =>{
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  this.id = localStorage.getItem("id");    
    this.appointmentServices.getAppointmentId(this.id).subscribe((response) =>{
      this.appointment = response; 
      this.appointments.date = this.appointment.date.substr(0,10);
      this.appointments.doctorId = this.appointment.doctorId;
      this.appointments.turn = this.appointment.turn;
      this.selected_doctor = this.appointments.doctorId.toString();
      this.selected_turn =  time_available[this.appointments.turn-1];
      this.getAppoinmentNotAvailableCurrent(this.appointments.date,this.appointments.turn);
    },(error) => {
      Swal.fire('Error',error.statusText,'question')
    });
 }
 
/**
 * Método que guarda los cambios de una cita , mediante un PUT a la API
 */
saveAppointment = () => {
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
    if((this.frmappoinment.get('frdate').value != null)&&(this.selected_turn != null)&&(this.selected_doctor != null)){
      this.id = localStorage.getItem("id");    
      this.appointments.doctorId = parseInt(this.selected_doctor);
      this.appointments.turn = time_available.indexOf(this.selected_turn.toString()) + 1;
      this.appointments.date = this.frmappoinment.get('frdate').value;  
        this.appointmentServices.editAppointment(this.id,this.appointments).subscribe((response)=>{
          Swal.fire({icon: 'info',title: 'Cita actualiza!',showConfirmButton: false,timer: 1250})
          this.router.navigateByUrl('\dashboard_appointment');  
        },(error) => {
          Swal.fire('Error',error.statusText,'question')
        });
    }else{
      Swal.fire({icon: 'error',title: 'Oops...', text: 'Campos incompletos!'})
    }
}


/**
 * Método para realizar la lógica de obtención de turnos, estó para un primer caso, teniendo en cuenta
 * las limitaciones de la API, en este caso se obtiene la fecha actual evitando escoger fechas anteriores 
 * @param {string} date turno que se desea tomar según la fecha y hora 
 * @param {number} id_current determinamos el turno que queremos editar
 * @returns de las horas disponibles y turnos disponibles al actualizar una cita
 */
getAppoinmentNotAvailableCurrent = (date,id_current) =>{
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  const turn_available = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.appointmentServices.getTurnNotAvailable(date).subscribe((response)=>{
        this.turn_notAvailable = response;
          if((Object.keys(this.turn_notAvailable).length) == 0){
            this.time_available_current = time_available;
          }else{      
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
                    const data_remove_time = time_available.indexOf(time_available[i]);
                    if( data_remove_time !== -1){         
                      time_available.splice(data_remove_time , 1);
                    }
                  }
                }
              }
            }
          this.time_available_current = time_available; 
          }
    },(error) => {
      Swal.fire('Error',error.statusText,'question')
    }); 
}

/**
 * Método para realizar la lógica de obtención de turnos, estó para después del primer caso, teniendo en cuenta
 * las limitaciones de la API, en este caso se obtiene la fecha actual evitando escoger fechas anteriores
 * @returns de las horas disponibles y turnos disponibles al acttualización de la cita
 */
getAppoinmentNotAvailable = () => {
  const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  const turn_available = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  this.appointments.date = this.frmappoinment.get('frdate').value;
    this.appointmentServices.getTurnNotAvailable(this.appointments.date).subscribe((response)=>{
      this.turn_notAvailable = response;
        if((Object.keys(this.turn_notAvailable).length) == 0){
          this.time_available_current = time_available;
        }else{
          const turn_availabl = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];      
          for (let i = 0; i < turn_available.length; i++) {
            for(let j = 0; j < (Object.keys(this.turn_notAvailable).length); j++){
              if(this.turn_notAvailable[j].turn == turn_available[i]){
                  const data_remove = turn_available.indexOf(turn_available[i]);
                  if ( data_remove !== -1 ) {
                    turn_available.splice( data_remove, 1 );
                  }
                  const data_remove_time = time_available.indexOf(time_available[i]);
                  if( data_remove_time !== -1){         
                    time_available.splice(data_remove_time , 1);
                  }
              }
            }
          }
        this.time_available_current = time_available;         
        }
    },(error) => {
     Swal.fire('Error',error.statusText,'question')
    }); 
}

/**
 * Método de cancelación de cita, está cancelación de la cita actualizada
 */ 
cancelAppointmentEdit = () => {
  this.router.navigateByUrl('\dashboard_appointment');
}    

}
