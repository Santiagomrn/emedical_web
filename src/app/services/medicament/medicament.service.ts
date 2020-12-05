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
  getMedicaments = (page: string,medicament:string): Promise<MedicamentInterface > => {
    let promise = new Promise <MedicamentInterface>((resolve, reject) => {
      if (this.cachedValues[medicament]) {
        resolve(this.cachedValues[medicament])
      } else {
        this.http.get("https://cima.aemps.es/cima/rest/medicamentos?&multiple="+medicament+"&cargaprincipiosactivos=true")
          .toPromise()
          .then((response) => {
            this.cachedValues[page]=response
            resolve(response as MedicamentInterface )
          }, (error) => {
            reject(error);
          })
      }
    })
    return promise;
  }
}
