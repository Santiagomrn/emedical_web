import { Component, OnInit } from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

/**
 * Componente de angular
 */
@Component({
  selector: 'app-profile-patients-doctor',
  templateUrl: './profile-patients-doctor.component.html',
  styleUrls: ['./profile-patients-doctor.component.css']
})
export class ProfilePatientsDoctorComponent implements OnInit {

  /**
   * Valor para la obtención del ID del usuario
   */
  id:any;

  /**
   * Valor para la visualización de los datos recibidos por una ID, de parte del médico
   */
  patients: PatientsInterface;

   /**
   * Constructor para utilizar modulos importados
   * @param {PatientsService} result_service consumo del servicio de paciente
   * @param {FormBuilder} fb consumo del modulo para formularios
   * @param {Router} router  consumo del modulo para redireccionar
   * @param {ActivatedRoute} route consumo del modulo obtención de ID
   */
  constructor(
    private result_service:  PatientsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.get_patient_appointment();
  }

  /**
   * Método de angular
   */
  ngOnInit(): void {
  }

  /**
   * Método para la obtención de datos del paciente, solo a los que el doctor tenga acceso
   * @returns los datos de los pacientes mediante una API
   */
  get_patient_appointment = () =>{
    this.id = this.route.snapshot.params['id'];    
      if(this.id){
        this.result_service.getDataPatients(this.id).subscribe((response) =>{
          this.patients = response;
        },(error) => {
          Swal.fire('Error',error.statusText,'question')
      }); 
      }
  }
}
