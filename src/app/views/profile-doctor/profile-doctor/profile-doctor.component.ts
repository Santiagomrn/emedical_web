import { Component, OnInit } from '@angular/core';
import { DoctorAPIService } from "../../../services/doctor/doctor-api.service";
import { _DoctorInterface } from "../../../interfaces/doctor/_doctor-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';
/**
 * Componente
 * 
 * Perfil del doctor 
 * 
 */
@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css']
})
export class ProfileDoctorComponent implements OnInit {
  /**
   * Interfaz del doctor
   * @type _DoctorInterface
   * @param patients_input
   */
  patients_input:_DoctorInterface= {
    "id": null,
    "name": null,
    "lastName": null,
    "phone": null,
    "email": null,
    "emergencyPhone": null,
    "password": null,
    "birthdate": null,
    "medicalArea": null,
    "description": null,
    "jobTitle": null,
    "professionalLicense": null,
    "nationality": null,
    "maritalStatus": null,
    "created_at": null,
    "updated_at": null
  }
/**
 * Constructor 
 * @param result_service Servicio de recuperación del doctor
 * @param fb  Formbuilder
 * @param router  Router
 * @param route Route
 */
  constructor(
    private result_service:  DoctorAPIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.get_doctor_ID();
   }
   /**
    * Variable que almacena los datos del doctor
    * @type _DoctorInterface
    */
  doctor: _DoctorInterface;
  /**
   * Identificador del doctor
   * @type any
   */
  id:any;
  /**
   * Método Angular
   * @return void
   */
  ngOnInit(): void {
  }
    //Obtenemos los datos mediante el id
    /**
     * Obtener el doctor por un ID
     * @param null
     * @returns _DoctorInterface
     */
    get_doctor_ID = () =>{
      // Obtenemos el id del paciente mediante la URL
      this.id =localStorage.getItem("id");    
      console.log(this.id);
      // Verificamos la existencia del parámetro 
      if(this.id){
          // Hacemos uso del servicio para la obtención de datos de la interfaz
          this.result_service.getDataDoctors(this.id).subscribe((response) =>{
          // Respaldamos la información de todos los pacientes
          
          this.doctor = response;
          console.log(this.doctor);
        },(error) => {
          Swal.fire('Error',error.statusText,'question')
      }); 
      }
    }

}
