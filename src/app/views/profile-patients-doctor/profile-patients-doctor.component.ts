import { Component, OnInit } from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-patients-doctor',
  templateUrl: './profile-patients-doctor.component.html',
  styleUrls: ['./profile-patients-doctor.component.css']
})
export class ProfilePatientsDoctorComponent implements OnInit {

  // Hacemos uso de una variable para obtener el ID del usaurio
  id:any;

  // Obtenemos los datos de la búsqueda de citas programadas
  patients: PatientsInterface;

  constructor(
    private result_service:  PatientsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    // Llamamos a los datos del paciente
    this.get_patient_appointment();
  }

  ngOnInit(): void {
  }


  get_patient_appointment = () =>{
    // Obtenemos el id del paciente mediante la URL
    this.id = this.route.snapshot.params['id'];    
    //console.log(this.id);
    // Verificamos la existencia del parámetro 
    if(this.id){
      // Hacemos uso del servicio para la obtención de datos de la interfaz
      this.result_service.getDataPatients(this.id).subscribe((response) =>{
        // Respaldamos la información de todos los pacientes
        this.patients = response;
        //console.log(this.patients);
      },(error) => {
        // Mostramos mensaje de error
        Swal.fire('Error',error.statusText,'question')
     }); 
    }
  }

}
