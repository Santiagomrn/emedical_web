import { Injectable } from '@angular/core';
import { DoctorInterface } from "../../interfaces/doctor/doctor-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * Inyección de angular
 */
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  /**
   * Valor que es un arreglo para realizar la busqueda de doctres y usar promesas
   */
  cachedValues: Array<{
    [query: string]: DoctorInterface 
  }> = [];
  
   /**
   * Constructor que invoca otros modulos
   * @param {HttpClient} http se utiliza para la autorización del token
   */
  constructor(private http: HttpClient) {
    this.http = http
  }

  /**
   * Método para la obtención de doctores que se visualizan en la vista de doctores
   * @param {string} results que son los datos a buscar
   * @param {string} page en la página que se desea, existen varios
   * @return la información de los doctores mediante una API
   */
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
