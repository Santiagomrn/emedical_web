import { Injectable } from '@angular/core';
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { resourceLimits } from 'worker_threads';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  cachedValues: Array<{
    [query: string]: PatientsInterface
  }> = [];

  constructor(private http: HttpClient) {
    this.http = http;
   }

  // Filtramos todos los datos de los pacientes, omitimos las promesas ya que no comprometemos una búsqueda
  // específica
  getDataPatients = () => {
    return this.http.get("https://medicalportal.herokuapp.com/api/v1/pathient");
  }   

  // Realizamos el guardado de los datos del paciente, pasando un objeto
  saveDataPatients = (data_patients: PatientsInterface) =>{
    return this.http.post("https://medicalportal.herokuapp.com/api/v1/pathient",data_patients);
  }


  /*
   saveAppointment = (results_itf: AppointmentInterface): Promise<AppointmentInterface> =>{
    let promise = new Promise <AppointmentInterface>((resolve, reject) => {
      if (this.cachedValues[this.results+this.page]) {
        resolve(this.cachedValues[this.results+this.page])
      }else {
        this.http.post(this.Url + this.results + '&page=' + this.page,results_itf)
          .toPromise()
          .then((response) => {
            this.cachedValues[this.results+this.page]=response
            resolve(response as AppointmentInterface)
          }, (error) => {
            reject(error);
          })
      } 
    });
    return promise;
   }
  */

}
