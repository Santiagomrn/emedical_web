import { Injectable } from '@angular/core';
import { AppointmentInterface } from "../../interfaces/appointment/appointment-interface";
import { NotAvailable } from '../../interfaces/appointment/not-available';
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
import { resourceLimits } from 'worker_threads';
import { Interface } from 'readline';
import { resolve } from 'dns';
import { rejects } from 'assert';

/**
 * Inyección de angular
 */
@Injectable({
  providedIn: 'root'
}) 
export class AppointmentService {

  /**
   * Valor del token que se mandará a la API
   */
  AccessToken = localStorage.getItem("token");

  /**
   * Constructor que invoca otros modulos
   * @param {HttpClient} http se utiliza para la autorización del token
   */
  constructor(private http: HttpClient) {
  this.http = http
  }

  /**
   * Método que realiza el servicio de obtener los datos de la API
   * @return un JSON con los valores de la API
   */
  getAppointment = () =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/", { headers: HeadersForPatientsAPI });
    }
  }

  /**
   * Método que realiza el servicio de obtener los datos de la API mediante un ID
   * @param {string} id de la cita a buscar
   * @return un JSON con los valores de la API
   */
  getAppointmentId = (id) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<AppointmentInterface>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/" + id, { headers: HeadersForPatientsAPI });
    }
  }

  /**
   * Método que realiza el servicio de envíar datos a la API
   * @param itfAppoinment el dato que se desea envíar mediante POST
   * @type Objet
   */
  createAppointment = (itfAppoinment) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Accept':'application/atom+xml',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.post("https://medicalportal.herokuapp.com/api/v1/medicalAppointment",JSON.stringify(itfAppoinment), { headers: HeadersForPatientsAPI });
    }
  }

    /**
   * Método que realiza la obtención de datos de turnos de una API
   * @param date se hace uso de la fecha para recibir los datos
   * @type string
   * @return de las citas ocupadas mediante turnos
   */
  getTurnNotAvailable = (date) =>{
    
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<NotAvailable>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/turn/NotAvailable?date="+date, { headers: HeadersForPatientsAPI });
    }
  }
  
 /**
  * Método que realiza el servicio de envíar datos a la API
  * @param id hace la petición de eliminar los datos mediante ID
  * @type string
  */
  deleteAppointment = (id) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.delete("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/"+id,{ headers: HeadersForPatientsAPI });
    }
   }

   /**
    * Método que realiza el servicio de envíar datos a la API
    * @param id para escoger el dato que se modificara
    * @type string
    * @param itfAppoinment son los datos que se envian para actualizar la cita
    * @type Object
    */
   editAppointment = (id,itfAppoinment) =>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.put("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/"+id, JSON.stringify(itfAppoinment),{ headers: HeadersForPatientsAPI });
    }
  }

  /**
   * Método que realiza la obtención de datos de una API
   * @return de todas las citas disponibles para un doctor en especifico
   */
  getAppointmentDoctor = ()=>{
    if(this.AccessToken){
      const HeadersForPatientsAPI = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (this.AccessToken)
      });
      return this.http.get<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/", { headers: HeadersForPatientsAPI });
    }
  }

    // Obtenemos el link abierto de la cita
    getAppointmentQRLink = (id)=>{
      if(this.AccessToken){
        const HeadersForPatientsAPI = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (this.AccessToken)
        });
        return this.http.get<AppointmentInterface[]>("https://medicalportal.herokuapp.com/api/v1/medicalAppointment/"+id+"/QR", { headers: HeadersForPatientsAPI });
      }
    }

}
