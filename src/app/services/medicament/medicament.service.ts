import { Injectable } from '@angular/core';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * Inyección de angular
 */
@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  /**
   * Valor que es un arreglo para realizar la busqueda de doctores y usar promesas
   */
  cachedValues: Array<{
    [query: string]: MedicamentInterface // Hacer referencia a la interface
  }> = [];
   
   /**
   * Constructor que invoca otros modulos
   * @param {HttpClient} http se utiliza para la autorización del token
   */
  constructor(private http: HttpClient) {
    this.http = http
  }  

  /**
   * Método para la obtención de medicamentos, que se visualizan en la vista de medicamentos
   * @param {string} medicament para filtrar mediante nombre
   * @param {string} selection_comerc para filtrar mediante nombre y selecciones
   * @param {string} selection_strip para filtrar mediante nombre y selecciones
   * @param {string} selection_active para filtrar mediante nombre y selecciones
   * @return los medicamentos disponibles en la API
   */
  getMedicaments = (medicament:string,selection_comerc: string, selection_strip: string,selection_active: string ): Promise<MedicamentInterface > => {
    let promise = new Promise <MedicamentInterface>((resolve, reject) => {
      if (this.cachedValues[medicament]) {
        resolve(this.cachedValues[medicament])
      } else {
        console.log(selection_comerc);
        console.log(selection_strip);
        console.log(selection_active);
        this.http.get("https://cima.aemps.es/cima/rest/medicamentos?&multiple="+medicament+"&cargaprincipiosactivos="+selection_active+ "&nomostrarip="+ selection_strip + "&comerc="+ selection_comerc)
          .toPromise()
          .then((response) => {
            this.cachedValues[medicament]=response
            resolve(response as MedicamentInterface )
          }, (error) => {
            reject(error);
          })
      }
    })
    return promise;
  }
}


