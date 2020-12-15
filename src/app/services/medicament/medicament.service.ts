import { Injectable } from '@angular/core';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  cachedValues: Array<{
    [query: string]: MedicamentInterface // Hacer referencia a la interface
  }> = [];
  constructor(private http: HttpClient) {
    this.http = http
  }  
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


