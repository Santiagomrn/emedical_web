import { Injectable } from '@angular/core';
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
import { resourceLimits } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJkb2N0b3IiLCJpZCI6MSwiaWF0IjoxNjExNDI5MjM4LCJleHAiOjE2MTE0MzEwMzh9.A00TbhvwwwU5KRifMwhik-Ya5_xHZLuMiZOxdiT3Px4";
  cachedValues: Array<{
    [query: string]: PatientsInterface
  }> = [];

  constructor(private http: HttpClient) {
    this.http = http;
   }

  // Filtramos todos los datos de los pacientes, omitimos las promesas ya que no comprometemos una búsqueda
  // específica
  getDataPatients = () => {
  
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<PatientsInterface[]>("https://medicalportal.herokuapp.com/api/v1/pathient/", { headers: HeadersForPatientsAPI });
    }
  
  }   

  // Realizamos el guardado de los datos del paciente, pasando un objeto
  saveDataPatients = (data_patients: PatientsInterface) =>{
    return this.http.post("https://medicalportal.herokuapp.com/api/v1/pathient/:id",data_patients);
  }

  
}
