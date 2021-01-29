import { Injectable } from '@angular/core';
import { Interface } from 'readline';
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
import { resourceLimits } from 'worker_threads';
import { resolve } from 'dns';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  // AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJkb2N0b3IiLCJpZCI6MSwiaWF0IjoxNjExNjgwNjQwLCJleHAiOjE2MTE2ODI0NDB9.5qEH2A20WL67bbSm4Z2O0vWNlvkPQgqHynC2ug7347Q";
  AccessToken = localStorage.getItem("token");

  constructor(private http: HttpClient) {
    this.http = http;
   }

  // Filtramos todos los datos de los pacientes, omitimos las promesas ya que no comprometemos una búsqueda
  // específica, realizamos filtrado de solo un paciente
  getDataPatients = (id) => {
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<PatientsInterface>("https://medicalportal.herokuapp.com/api/v1/pathient/"+id, { headers: HeadersForPatientsAPI });  
    }  
  }   

  // Realizamos el filtrado de diversos pacientes para la visualización del doctor
  getDataListPatients = (id,data:boolean) => {
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      if(data == true){
        return this.http.get<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/", { headers: HeadersForPatientsAPI });
      }else{
        return this.http.get<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/"+id, { headers: HeadersForPatientsAPI });
      }
    }
  }

  // Realizamos el guardado de los datos del paciente, pasando un objeto
  saveDataPatients = (id,data_patients: PatientsInterface) =>{  
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.put<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/"+id, data_patients, { headers: HeadersForPatientsAPI });
    }
  }
  // Crear un paciente
  savePatient  = (body) => {
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post("https://medicalportal.herokuapp.com/api/v1/pathient",JSON.stringify(body), { headers: HeadersForPatientsAPI });
    }
  }

  
}
