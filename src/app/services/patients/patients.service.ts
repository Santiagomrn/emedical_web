import { Injectable } from '@angular/core';
import { Interface } from 'readline';
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
import { resourceLimits } from 'worker_threads';
import { resolve } from 'dns';
import { rejects } from 'assert';

/**
 * Servicios del paciente
 */
@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  /**
   * Variable que almacena el token del usuario
   */
  AccessToken = localStorage.getItem("token");
/**
 * Constructor
 * @param http 
 */
  constructor(private http: HttpClient) {
    this.http = http;
   }

  // Filtramos todos los datos de los pacientes, omitimos las promesas ya que no comprometemos una búsqueda
  // específica, realizamos filtrado de solo un paciente
  /**
   * Se filtran los datos de los pacientes
   * 
   * @param id 
   * @returns PatientsInterface
   */
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
  /**
   * Se realiza el filtrado de diversos pacientes para la visualización del doctor
   * @param id 
   * @param data 
   * @returns PatientsInterface
   */
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

  /**
   * Realizamos el guardado de los datos del paciente, pasando un objeto
   *  */ 
  saveDataPatients = (id,data_patients) =>{  
    console.log(JSON.stringify(data_patients));
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.put("https://medicalportal.herokuapp.com/api/v1/pathient/"+id, JSON.stringify(data_patients), { headers: HeadersForPatientsAPI });
    }
  }
  // Crear un paciente
  /**
   * Crear un paciente
   * @param body 
   * @returns response
   */
  savePatient  = (body) => {
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post("https://medicalportal.herokuapp.com/api/v1/pathient",JSON.stringify(body), { headers: HeadersForPatientsAPI });
    }
  }

  
}
