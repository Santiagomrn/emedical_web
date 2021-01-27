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
import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  appointment:AppointmentInterface = {
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
  };


doctor_data: _DoctorInterface;

// Hacemos uso de formularios   
frmappoinment;
data: string;

selected: string;

  constructor(
    private appointmentServices:  AppointmentService,
    private doctorServices: DoctorAPIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.frmappoinment = this.fb.group({
      frtime: ['',Validators.required],
      frdate: ['',Validators.required],
      frturn: ['',Validators.required]
    });

    

   
  }

  ngOnInit(): void {
    this.getDataDoctorCreate();
  }

  // Obtenemos todos los valores de los doctores 
  getDataDoctorCreate = ()=>{
    this.doctorServices.getDataDoctorsAppointmentCreate().subscribe((response)=>{
      this.doctor_data = response;

      
      console.log(Object.values(this.doctor_data));
      console.log(this.doctor_data);
    });
  }



  AppoinmentCreate = ()=>{
    
    //this.patients_input.name = this.frmpatients.get('frname').value;
    //this.patients_input.lastName = this.frmpatients.get('frlastName').value;
    
    this.appointment.turn = this.frmappoinment.get('frturn').value;
    this.appointment.date = this.frmappoinment.get('frdate').value;
    this.appointment.time = this.frmappoinment.get('frtime').value;

console.log(this.selected);
    console.log(this.appointment.turn);
    console.log(this.appointment.date);
     console.log(this.appointment.time);
     
    /*
    this.appointmentServices.createAppointment(this.appointment).subscribe((response)=>{

    });*/
  }



  cancelAppointment = () =>{
    this.router.navigateByUrl('\dashboard_appointment');
  }

  
}
