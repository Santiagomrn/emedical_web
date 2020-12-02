import { Injectable } from '@angular/core';
import { NewsInterface } from "../../interfaces/news/news-interface";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  cachedValues: Array<{
    [query: string]: NewsInterface // Hacer referencia a la interface
  }> = [];

  constructor(private http: HttpClient) {
    this.http = http
  }

  getNews = (limit: string, offset: string, country: string): Promise<NewsInterface> => {
    let promise = new Promise <NewsInterface>((resolve, reject) => {
      if (this.cachedValues[limit+offset+country]) {
        resolve(this.cachedValues[limit+offset+country])
      } else {
        //this.http.get('http://api.coronatracker.com/news/trending?limit=' + limit + '&country=' + country + '&offset=' + offset)
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
