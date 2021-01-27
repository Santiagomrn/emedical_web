import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-dashbord-appoinment',
  templateUrl: './dashbord-appoinment.component.html',
  styleUrls: ['./dashbord-appoinment.component.css']
})
export class DashbordAppoinmentComponent implements OnInit {

  appointments:AppointmentInterface;

  /* Paginación */
  response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['turn','date','time','crud'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private appointmentService:  AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAppointmentId();
  }

  getAppointmentId = () => 
  {
      // Hacemos uso del servicio para la obtención de datos de la interfaz
      this.appointmentService.getAppointment().subscribe((response)=>{
        // Respaldamos el resultado obtenido
        this.response_resultados = response;
        console.log(this.appointments);

        // Realizamos paginación correspondiente
        this.dataSource = new MatTableDataSource(this.response_resultados);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);

      },(error) => {
        alert("Error: " + error.statusText);
      });
    
  }


}