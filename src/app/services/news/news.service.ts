import { Injectable } from '@angular/core';
import { NewsInterface } from "../../interfaces/news/news-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * Inyección de angular
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

   /**
   * Valor que es un arreglo para realizar la busqueda de noticias y usar promesas
   */
  cachedValues: Array<{
    [query: string]: NewsInterface 
  }> = [];

  /**
   * Constructor que invoca otros modulos
   * @param {HttpClient} http se utiliza para la autorización del token
   */
  constructor(private http: HttpClient) {
    this.http = http
  }

  /**
   * Método para la obtención de noticias que se visualizan en la vista home
   * @param limit de las noticias a visualizar
   * @param offset 
   * @param country de las noticias
   */
  getNews = (limit: string, offset: string, country: string): Promise<NewsInterface> => {
    let promise = new Promise <NewsInterface>((resolve, reject) => {
      if (this.cachedValues[limit+offset+country]) {
        resolve(this.cachedValues[limit+offset+country])
      } else {
        this.http.get('/news'+ 'trending?limit=' + limit + '&country=' + country + '&offset=' + offset)  
        .toPromise()
          .then((response) => {
            this.cachedValues[limit+offset+country]=response
            resolve(response as NewsInterface)
          }, (error) => {
            reject(error);
          })
      }
    })
    return promise;
  }
}
