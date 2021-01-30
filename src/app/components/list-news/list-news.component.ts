import {Component,OnInit} from '@angular/core';
import { NewsInterface } from "../../interfaces/news/news-interface";
import { NewsService } from "../../services/news/news.service";
/**
 * Realizamos la exportación de la interfaz para utilizarlo
 */
export interface Section {
  /**
   * name de la sección a utilizar
   * @type string
   */
  name: string;
  /**
   * updated de la ultima actualización hecha
   * @type Date
   */
  updated: Date;
}

/**
 * Componente de angular
 */
@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
/**
 * 
 */
export class ListNewsComponent implements OnInit {

/**
 * Valor para la visualización de los datos de las noticias recibidas por una API
 */
  news:NewsInterface

/**
 * Valor obtener el total de noticias otorgada por la API
 */
  total:number

/**
 * Constructor para utilizar modulos importados
 * @param {NewsService} NewsService hacemos uso del servicio que otorga noticias 
 */  
  constructor(private NewsService:NewsService) {
    this.total=0
   }

  /**
   * Método de angular
   */
   ngOnInit(){
    this.getNews()
   }

  /**
   * Método que obtiene las noticias que se visualizan en el Home, estás son actuales
   * @returns de los datos para las noticias actuales
   */
  getNews=()=>{
    this.NewsService.getNews("10","1","Mexico").then((response) => {
      this.news = response;
      this.total=response.total;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }

/**
 * Hacemos uso de una sección que nos solicita la API para su uso
 */
  folders: Section[] = [
    /**
     * Sección para la obtención de fotos actuales
     */
    {
       /**
       * Nombre para hacer referencia a la acción
       * @type string
       */
      name: 'Photos',
      /**
       * Fecha de la última actualización
       * @type date
       */
      updated: new Date('1/1/16'),
    },
    /**
     * Sección para la obtención de recetas 
     */
    {
       /**
       * Nombre para hacer referencia a la acción
       * @type string
       */
      name: 'Recipes',
      /**
       * Fecha de la última actualización
       * @type date
       */
      updated: new Date('1/17/16'),
    },
    /**
     * Sección para la obtención de trabajos realizados
     */
    {
       /**
       * Nombre para hacer referencia a la acción
       * @type string
       */
      name: 'Work',
      /**
       * Fecha de la última actualización
       * @type date
       */
      updated: new Date('1/28/16'),
    }
  ];

/**
 * Hacemos uso de una sección que nos solicita la API para su uso
 */
  notes: Section[] = [
    /**
     * Sección para la obtención de itenerartio de vacaciones
     */
    {
      /**
       * Nombre para hacer referencia a la acción
       * @type string
       */
      name: 'Vacation Itinerary',
      /**
       * Fecha de la última actualización
       * @type date
       */
      updated: new Date('2/20/16'),
    },
    /**
     * Sección para la obtención de modelos de cocina
     */
    {
      /**
       * Nombre para hacer referencia a la acción
       * @type string
       */
      name: 'Kitchen Remodel',
      /**
       * Fecha de la última actualización
       * @type date
       */
      updated: new Date('1/18/16'),
    }
  ];

}
