import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { _DoctorInterface } from '../../interfaces/doctor/_doctor-interface';
import { DoctorAPIService } from '../../services/doctor/doctor-api.service';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import { formatDate, Time } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NotAvailable } from 'src/app/interfaces/appointment/not-available';
import Swal from 'sweetalert2';

/**
 * Componente de angular
 */
@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})

export class AppointmentCreateComponent implements OnInit {

   /**
   * Valores para la creación de citas nuevas
   */
  appointments = {
    date: null,
    turn: null,
    doctorId: null,
  }

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
  selected_turn: number;
  
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
    private route: ActivatedRoute,
  ) {
    this.frmappoinment = this.fb.group({
      frdate: ['',Validators.required],
    });
    const month_form = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const day_form = ["01","02","03","04","05","06","07","08","09"];
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth();
    const day = (new Date()).getDate();
    if(day < 10){
    this.appointments.date = year + '-' + month_form[month] + '-' + day_form[day];
    }else{
    this.appointments.date = year + '-' + month_form[month] + '-' + (day+1);
    }
    console.log(this.appointments.date);
    this.getAppoinmentNotAvailableCurrent(this.appointments.date);
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
   * Método que realiza la creación de la cita, mediante un POST a la API
   */
  AppoinmentCreate = ()=>{
    const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30']; 
      if((this.frmappoinment.get('frdate').value != null)&&(this.selected_turn != null)&&(this.selected_doctor != null)){
          this.appointments.doctorId = parseInt(this.selected_doctor);
          this.appointments.turn = time_available.indexOf(this.selected_turn.toString()) + 1;
          this.appointments.date = this.frmappoinment.get('frdate').value;
          this.appointmentServices.createAppointment(this.appointments).subscribe((response)=>{
          Swal.fire({icon: 'success',title: 'Cita creada!',showConfirmButton: false,timer: 1250})
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
   * @returns de las horas disponibles y turnos disponibles al crear una cita 
   */
  getAppoinmentNotAvailableCurrent = (date) =>{
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
              this.time_available_current = time_available;
            }
      },(error) => {
        Swal.fire('Error',error.statusText,'question')
      }); 
  }

/**
 * Método para realizar la lógica de obtención de turnos, estó para después del primer caso, teniendo en cuenta
   * las limitaciones de la API, en este caso se obtiene la fecha actual evitando escoger fechas anteriores
   * @returns de las horas disponibles y turnos disponibles al crear una cita
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
   * Método de cancelación de cita, está cancelación es al crear una nueva cita
   */
  cancelAppointmentCreate = () =>{
    this.router.navigateByUrl('\dashboard_appointment');
  }
}
