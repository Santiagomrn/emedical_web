import M from 'materialize-css';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DoctorInterface } from "../../interfaces/doctor/doctor-interface";
import {DoctorService} from "../../services/doctor/doctor.service";
/**
 * Compoentne de doctores 
 */
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, AfterViewInit{
  /**
   * Variable que almacena la interfaz doctor
   * @type DoctorInterface
   */
  doctors:DoctorInterface;
  /**
   * Número que representa el total de doctores
   */
  total:number;
/**
 * Constructor
 * @param DoctorService Interfaz doctor
 * @param router 
 */
  constructor(private DoctorService:DoctorService,private router: Router) { 
    }
    /**
     * Método de angular
     * 
     * Ejecuta un llamado a getDoctors()
     */
  ngOnInit(): void {
    this.getDoctors()
  }
  /**
   * Se obtiene los doctores del sistema para que el paciente pueda observarlos
   *  @returns DoctorInterface
   */
  getDoctors=()=>{
    this.DoctorService.getDoctors("4","1").then((response) => {
      this.doctors = response;
      this.total=response.info.results;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }
  /**
   * Se inicializa Materialize CSS
   */
  ngAfterViewInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems,{ fullWidth: true, indicators:true, shift: 2, numVisible: 4, noWrap: false });
  }
  
}
