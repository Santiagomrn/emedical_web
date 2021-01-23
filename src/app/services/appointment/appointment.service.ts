import { Injectable } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { resourceLimits } from 'worker_threads';

@Injectable({
  providedIn: 'root'
}) 
export class AppointmentService {

  //Url = 'https://medicalportal.herokuapp.com/api/v1/medicalAppointment/?q=';
  Url = 'https://randomuser.me/api/?exc=login,location,id&results=';
  page = '1';
  results = 'number';
  cachedValues: Array<{
    [query: string]: AppointmentInterface 
  }> = [];


    constructor(private http: HttpClient) {
    this.http = http
   }

   getAppointmentAll = () =>{
    return  this.http.get(this.Url);
   }

   getAppointment = (data: string): Promise<AppointmentInterface> =>{
    let promise = new Promise <AppointmentInterface>((resolve, reject) => {
      if (this.cachedValues[data+this.page]) {
        resolve(this.cachedValues[data+this.page])
      }else {
        this.http.get(this.Url + data + '&page=' + this.page)
          .toPromise()
          .then((response) => {
            this.cachedValues[data+this.page]=response
            resolve(response as AppointmentInterface)
          }, (error) => {
            reject(error);
          })
      } 
    });
    return promise;
   }


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


   editAppointment = (results_itf: AppointmentInterface): Promise<AppointmentInterface> =>{
    let promise = new Promise <AppointmentInterface>((resolve, reject) => {
      if (this.cachedValues[this.results+this.page]) {
        resolve(this.cachedValues[this.results+this.page])
      }else {
        this.http.put(this.Url + results_itf.id + '&page=' + this.page,results_itf)
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

   
   deleteAppointment = (id) =>{
    return this.http.delete(this.Url + id)
   }

}
