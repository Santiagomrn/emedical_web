import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { _DoctorInterface } from '../../interfaces/doctor/_doctor-interface';
import {DoctorAPIService} from '../../services/doctor/doctor-api.service';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import { formatDate, Time } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NotAvailable } from 'src/app/interfaces/appointment/not-available';


@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  // Interfaz para creación de cita
  appointments:AppointmentInterface = {
    QRCode:null,
    created_at: null,
    date: null,
    doctor:null,
    doctorId: null,
    id: null,
    pathient:null,
    pathientId: null,
    time: null,
    turn: null,
    updated_at: null
  }

  // Interfaz para visualizaer lista de doctores
  doctor_data: _DoctorInterface;

  // Hacemos uso de la interfaz para obtener turnos no disponibles
  turn_notAvailable: NotAvailable;

  // Obtenemos la cantidad de turnos disponiblesy fechas
  time_available_current: Array<string>;

  // Hacemos uso de las selecciones hechas por el usaurio
  selected_doctor: string;
  selected_turn: number;
  
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
      frdate: ['',Validators.required],
    });

    // Hacemos una arreglo para el mes 
    const month_form = ["01","02","03","04","05","06","07","08","09","10","11","12"];

    // Obtenemos la fecha actual
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth();
    const day = (new Date()).getDate();

    // Respaldamos la fecha actual  
    this.appointments.date = year + '-' + month_form[month] + '-' + day;

    console.log(this.appointments.date);

    // Verificamos las citas disponibles en la fecha actual
    this.getAppoinmentNotAvailableCurrent(this.appointments.date);

     //NO OLVIDAR VALIDAR SI EL DIA ACTUAL SE LLENA DE CITAS SE CAMBIA DE DIA
  }

  ngOnInit(): void {
    this.getDataDoctorAppoinmentCreate();  
  }

  // Obtenemos todos los valores de los doctores 
  getDataDoctorAppoinmentCreate = ()=>{
    this.doctorServices.getDataDoctorsAppointmentCreate().subscribe((response)=>{
      this.doctor_data = response;      

      console.log(this.doctor_data);
    },(error) => {
      alert("Error: " + error.statusText);
    });
  }

  // Realizamos la creación de la cita
  AppoinmentCreate = ()=>{
    const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
    
    // Validamos valores obtenidos   
    if((this.frmappoinment.get('frdate').value != null)&&(this.selected_turn != null)&&(this.selected_doctor != null)){
     
      // Respaldamos la información obtenida
      this.appointments.doctorId = parseInt(this.selected_doctor);
      this.appointments.turn = time_available.indexOf(this.selected_turn.toString()) + 1;
      this.appointments.date = this.frmappoinment.get('frdate').value;

      console.log(this.appointments.doctorId);
      console.log(this.appointments.turn);
      console.log(this.appointments.date);

      this.appointmentServices.createAppointment(this.appointments).subscribe((response)=>{
      },(error) => {
        alert("Error: " + error.statusText);
      });

    }else{
      alert("Error campos incompletos, llenar para continuar");
    }

    
    
  }

  // Cancelamos la cita que se deseaba crear
  cancelAppointmentCreate = () =>{
    this.router.navigateByUrl('\dashboard_appointment');
  }

  // Realizamos la obtención de fechas y turnos disponibles para las citas de la fecha actual
  getAppoinmentNotAvailableCurrent = (date) =>{
    // Hacemos uso de arreglos de horas y turnos posiblemente disponibles
    const time_available = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
    const turn_available = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    
    this.appointmentServices.getTurnNotAvailable(date).subscribe((response)=>{
        this.turn_notAvailable = response;
        console.log(this.turn_notAvailable.turn);

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

                    console.log(time_available);
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

    console.log(this.appointments.date);

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
