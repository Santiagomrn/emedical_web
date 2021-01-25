import M from 'materialize-css';
import {AfterViewInit,ElementRef, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { element } from 'protractor';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";

@Component({
  selector: 'app-home-patients',
  templateUrl: './home-patients.component.html',
  styleUrls: ['./home-patients.component.css']
})
export class HomePatientsComponent implements OnInit {
  appointment_data:AppointmentInterface = {
    id: null,
    doctorId: null,
    pathientId: null,
    date: null,
    time: null,
    number: null,
    created_at: null,
    updated_at: null
  }
  id: any;
  appointment_data_response:AppointmentInterface[];

  /* Paginación */
  public response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','date','time','crud'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private Appointment_Service: AppointmentService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this. getListAppointment();
  }

  getElementAppointment = (id) =>{
    this.Appointment_Service.getAppointment(id,'2').subscribe((response:AppointmentInterface[]) => {  
      this.response_resultados = response;

      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
  
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }

  getListAppointment = () =>{
    this.Appointment_Service.getAppointment('all','1').subscribe((response:AppointmentInterface[]) => {  
      this.response_resultados = response;

      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
  
     this.appointment_data_response = response;

    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }


deleteAppointment = (id) =>{
  this.Appointment_Service.deleteAppointment(id).subscribe((respose) =>{
    this.getElementAppointment(id);    
   }, (error) => {
     alert("Error: " + error.statusText);
   });
}


}

