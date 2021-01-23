import M from 'materialize-css';
import {AfterViewInit,ElementRef, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { MedicamentService} from "../../services/medicament/medicament.service";
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
  patients_data:MedicamentInterface;

  /* Paginación */
  public response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','date','time','crud'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private Patient_Service: MedicamentService,
    private Appointment_Service: AppointmentService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getMedicaments("ambroxol");
  }

  getMedicaments(data){

    this.Patient_Service.getMedicaments(data,'true','true','true' ).then((response) => {  
      this.response_resultados = response.resultados;

      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      
      this.patients_data = response;
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }

  delete_appointment(id){
    this.Appointment_Service.deleteAppointment(id).subscribe((respose) =>{
     this.getMedicaments("tres");  //SE cambia esto  
    }, (error) => {
      alert("Error: " + error.statusText);
    });
  }
}
