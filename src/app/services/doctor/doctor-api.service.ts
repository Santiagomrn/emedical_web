import { Injectable } from '@angular/core';
import { _DoctorInterface } from "../../interfaces/doctor/_doctor-interface";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorAPIService {
  AccessToken = localStorage.getItem("token");
  constructor(private http : HttpClient) {
    this.http = http
  }
  getDataDoctors = (id) => {
    if(this.AccessToken){
      const HeadersForDoctorsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<_DoctorInterface>("https://medicalportal.herokuapp.com/api/v1/doctor/"+id, { headers: HeadersForDoctorsAPI });  
    }  
  }   

}
