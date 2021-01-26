import { Component, OnInit } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointment:AppointmentInterface = {
    id: null,
    doctorId: null,
    pathientId: null,
    date: null,
    time: null,
    number: null,
    created_at: null,
    updated_at: null
  };
  id:any;
  editing:boolean = false;
  appointments:AppointmentInterface[];


  constructor(
    private appointmentService:  AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this. getID();
    this.getNumber();
  }

  getID = () =>{
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.appointmentService.getAppointment(null, true).subscribe((response:AppointmentInterface[]) => {
        this.appointments = response;
        this.appointment = this.appointments.find((m)=>{ return m.id==this.id});
      }, (error) => {
        alert("Error: " + error.statusText);
      });
    }
  }

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
    
    cancelAppointmentCreate = () => {
       this.router.navigateByUrl('\home_patients');
    }
}
