import M from 'materialize-css';
import { Component, OnInit,ViewChild } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { AppointmentService } from "../../services/appointment/appointment.service";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { element } from 'protractor';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashbord-appoinment',
  templateUrl: './dashbord-appoinment.component.html',
  styleUrls: ['./dashbord-appoinment.component.css']
})

/** Esta clase define el panel de control para visualizar las citas del paciente 
 * @author: Francisco Eduardo Pech Chim
 * @version: 28/01/2021/A
 * @see <a href="https://medicalportal.herokuapp.com/api/v1/"></a>
 */

export class DashbordAppoinmentComponent implements OnInit {

  // Campos de la clase
  current_date:string;
  appointments:AppointmentInterface;
  response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['turn','date','time','crud'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private appointmentService:  AppointmentService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){ 
    const month_form = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth();
    const day = (new Date()).getDate();
    this.current_date = year + '-' + month_form[month] + '-' + (day+1);
  }

  ngOnInit(): void {
    this.getAppointment();
  }

  /**
   * Generamos un código QR
   */
  getCodeQR = () =>{
 
  }

  /** 
  * Obtenemos un listado de citas de paciente mediante el consumo de una API Appoinment.
  * @return response del resultado otorgado por la API
  */
  getAppointment = () => 
  {
    this.appointmentService.getAppointment().subscribe((response)=>{
      this.response_resultados = response;
      //console.log(this.response_resultados);
      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    },(error) => {
      Swal.fire('Error',error.statusText,'question')
    });
  }
}
