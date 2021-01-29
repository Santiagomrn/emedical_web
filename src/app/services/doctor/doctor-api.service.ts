import { Injectable } from '@angular/core';
import { _DoctorInterface } from "../../interfaces/doctor/_doctor-interface";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

/**
 * Inyección de angular
 */
@Injectable({
  providedIn: 'root'
})
export class DoctorAPIService {
  /**
   * Valor del token que se mandará a la API
   */
  AccessToken = localStorage.getItem("token");
  
  /**
   * Constructor que invoca otros modulos
   * @param {HttpClient} http se utiliza para la autorización del token
   */
  constructor(private http : HttpClient) {
    this.http = http
  }

  /**
   * Método que realiza el servicio de obtener los datos de la API
   * @return un JSON con los datos de los doctores 
   */
  getDataDoctors = (id) => {
    if(this.AccessToken){
      const HeadersForDoctorsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<_DoctorInterface>("https://medicalportal.herokuapp.com/api/v1/doctor/"+id, { headers: HeadersForDoctorsAPI });  
    }  
  }   

  /**
   * Método que realiza el servicio de obtener los datos de la API
   * @return un JSON datos de los doctores para la creación de una cita
   */
  getDataDoctorsAppointmentCreate = () =>{
    if(this.AccessToken){
      const HeadersForDoctorsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<_DoctorInterface>("https://medicalportal.herokuapp.com/api/v1/doctor/", { headers: HeadersForDoctorsAPI });  
    }  
  }

}
