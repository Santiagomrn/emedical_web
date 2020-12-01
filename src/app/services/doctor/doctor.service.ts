import { Injectable } from '@angular/core';
import { DoctorInterface } from "../../interfaces/doctor/doctor-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  cachedValues: Array<{
    [query: string]: DoctorInterface // Hacer referencia a la interface
  }> = [];
  constructor(private http: HttpClient) {
    this.http = http
  }

  getDoctors = (results: string, page: string): Promise<DoctorInterface> => {
    let promise = new Promise <DoctorInterface>((resolve, reject) => {
      if (this.cachedValues[results+page]) {
        resolve(this.cachedValues[results+page])
      } else {
        this.http.get('https://randomuser.me/api/?exc=login,location,id&results=' + results + '&page=' + page)
          .toPromise()
          .then((response) => {
            this.cachedValues[results+page]=response
            resolve(response as DoctorInterface)
          }, (error) => {
            reject(error);
          })
      }
    })
    return promise;
  }
}
