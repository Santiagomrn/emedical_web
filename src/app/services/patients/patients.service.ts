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

  AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJwYXRoaWVudCIsImlkIjoyOCwiaWF0IjoxNjExNjAxNjA5LCJleHAiOjE2MTE2MDM0MDl9.RuCDv5RtnacnoiwqZ10Zq15u7ikNonIUK3CmYWVWY3Y";
 

  constructor(private http: HttpClient) {
    this.http = http;
   }

  // Filtramos todos los datos de los pacientes, omitimos las promesas ya que no comprometemos una búsqueda
  // específica
  // Para todos los datos hacemos uso de (null,'1')
  // Para un dato especifico (id,'2')
  getDataPatients = (id,data) => {
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
        if(data == true){
          return this.http.get<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/", { headers: HeadersForPatientsAPI });
        }else if(data == false){
          return this.http.get<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/"+id, { headers: HeadersForPatientsAPI });
        }
      
    }
  
  }   

  // Realizamos el guardado de los datos del paciente, pasando un objeto
  saveDataPatients = (data_patients: PatientsInterface) =>{  
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.post<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/:id=1", data_patients, { headers: HeadersForPatientsAPI });
    }
  }

  
}
