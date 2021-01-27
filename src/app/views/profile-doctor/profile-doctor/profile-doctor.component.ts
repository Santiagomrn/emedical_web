import { Component, OnInit } from '@angular/core';
import { DoctorAPIService } from "../../../services/doctor/doctor-api.service";
import { _DoctorInterface } from "../../../interfaces/doctor/_doctor-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css']
})
export class ProfileDoctorComponent implements OnInit {
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

  // frmpatients = this.fb.group({
  //   frname: ['',Validators.required],
  //   frlastName:['',Validators.required],
  //   fremail: ['',Validators.required],
  //   frpassword: ['',Validators.required],
  //   frbirthdate: ['',Validators.required],
  //   frphone: ['',Validators.required],
  //   fremergencyPhone: ['',Validators.required]
  // });

  constructor(
    private result_service:  DoctorAPIService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.get_doctor_ID();
   }
  doctor: _DoctorInterface;
  id:any;
  ngOnInit(): void {
  }
    //Obtenemos los datos mediante el id
    get_doctor_ID = () =>{
      // Obtenemos el id del paciente mediante la URL
      this.id =localStorage.getItem("id");    
      console.log(this.id);
      // Verificamos la existencia del parámetro 
      if(this.id){
          // Hacemos uso del servicio para la obtención de datos de la interfaz
          this.result_service.getDataDoctors(this.id).subscribe((response) =>{
          // Respaldamos la información de todos los pacientes
          alert(response);
          this.doctor = response;
          console.log(this.doctor);
        }); 
      }
    }

}
