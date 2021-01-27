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
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

 
// Hacemos uso de formularios   
frmappoinment = this.fb.group({
  frturn: ['',Validators.required],
  frdate:['',Validators.required],
  frtime: ['',Validators.required],
});

  constructor(
    private appointmentServices:  AppointmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  AppoinmentCreate = ()=>{
    
    //this.patients_input.name = this.frmpatients.get('frname').value;
    //this.patients_input.lastName = this.frmpatients.get('frlastName').value;
    
    /*this.appointmentServices.createAppointment().subscribe((response)=>{

    });*/
  }

  cancelAppointment = () =>{
    this.router.navigateByUrl('\dashboard_appointment');
  }
}
