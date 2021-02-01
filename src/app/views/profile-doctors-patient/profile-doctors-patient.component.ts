import { Component, OnInit } from '@angular/core';
import { DoctorAPIService } from "../../services/doctor/doctor-api.service";
import { _DoctorInterface } from "../../interfaces/doctor/_doctor-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';
/**
 * Componente de angular
 */
@Component({
  selector: 'app-profile-doctors-patient',
  templateUrl: './profile-doctors-patient.component.html',
  styleUrls: ['./profile-doctors-patient.component.css']
})
export class ProfileDoctorsPatientComponent implements OnInit {

  
  /**
   * Valor para la obtención del ID del doctor
   */
  id:any;

  /**
   * Valor para la visualización de los datos recibidos por una ID, de parte del paciente
   */
  doctor: _DoctorInterface;
  
    /**
   * Constructor para utilizar modulos importados
   * @param {DoctorAPIService} result_service consumo del servicio de doctores
   * @param {FormBuilder} fb consumo del modulo para formularios
   * @param {Router} router  consumo del modulo para redireccionar
   * @param {ActivatedRoute} route consumo del modulo obtención de ID
   */
  constructor(
    private result_service:  DoctorAPIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.get_doctor_profile();
  }

  /**
   * Método de angular
   */
  ngOnInit(): void {
  }

   /**
   * Método para la obtención de datos del doctor, cualquier paciente tiene acceso
   * @returns los datos de los doctor mediante una API
   */
  get_doctor_profile = () =>{
    this.id = this.route.snapshot.params['id'];   
      if(this.id){
        this.result_service.getDataDoctors(this.id).subscribe((response) =>{
          this.doctor = response;
        },(error) => {
          Swal.fire('Error',error.statusText,'question')
      }); 
      }
  }
}
