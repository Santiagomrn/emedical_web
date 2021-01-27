import { Injectable } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
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
  // Para obtener todos los datos (null,true)
  // Para obtener datos especificos mediante id (id,false)
  getAppointment = (id,data:boolean) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
        if(data == true){
          return this.http.get<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/", { headers: HeadersForPatientsAPI });
        }else if(data == false){
          return this.http.get<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/"+id, { headers: HeadersForPatientsAPI });
        }
    }
  }

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
   }

}
