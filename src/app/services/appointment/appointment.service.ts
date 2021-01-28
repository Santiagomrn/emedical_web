import { Injectable } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { NotAvailable } from '../../interfaces/appointment/not-available';
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
import { resourceLimits } from 'worker_threads';
import { Interface } from 'readline';
import { resolve } from 'dns';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
}) 
export class AppointmentService {

  AccessToken = localStorage.getItem("token");

  constructor(private http: HttpClient) {
  this.http = http
  }

  // Obtenemos los datos de la cita de cada paciente
  getAppointment = () =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/", { headers: HeadersForPatientsAPI });
    }
  }

  // Obtención de datos mediante ID
  getAppointmentId = (id) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<AppointmentInterface>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/" + id, { headers: HeadersForPatientsAPI });
    }
  }

  // Creación de una nueva cita
  createAppointment = (itfAppoinment) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.post<AppointmentInterface>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/",itfAppoinment, { headers: HeadersForPatientsAPI });
    }
  }


  // Obtenemos los turnos ocupados por fecha
  getTurnNotAvailable = (date) =>{
    
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<NotAvailable>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/turn/NotAvailable?date="+date, { headers: HeadersForPatientsAPI });
    }
  }
  
/*

  // Guardamos los datos de la cita 
  saveAppointment = (result_appoinmtment: AppointmentInterface) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.post<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/",result_appoinmtment ,{ headers: HeadersForPatientsAPI });
    }
  }

  // Editamos datos de la cita
  editAppointment = (id,result_appoinmtment: AppointmentInterface) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.put<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment?id="+id,result_appoinmtment ,{ headers: HeadersForPatientsAPI });
    }
  }
  
  // Cancelación de la cita
  deleteAppointment = (id) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.delete<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment?id="+id,{ headers: HeadersForPatientsAPI });
    }
   }*/

}
