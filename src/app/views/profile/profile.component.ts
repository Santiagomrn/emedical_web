import { Component, OnInit } from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patients_data:PatientsInterface = {
    id: null,
    name: null,
    lastName: null,
    phone: null,
    email: null,
    emergencyPhone: null,
    password: null,
    birthdate: null,
    created_at: null,
    updated_at: null
  }
  id:any;
  patients_data_response:PatientsInterface[];

  constructor(
    private result_service:  PatientsService,
    private form: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Llamamos a la obtención de los pacientes mediante ID
    this.get_patient_ID();
  }

  //Obtenemos los datos mediante el id
  get_patient_ID = () =>{
    // Obtenemos el id del paciente mediante la URL
    this.id = this.route.snapshot.params['id'];             
    // Verificamos la existencia del parámetro 
    if(this.id){
        // Hacemos uso del servicio para la obtención de datos de la interfaz
        this.result_service.getDataPatients().subscribe((response:PatientsInterface[]) =>{
        // Respaldamos la información de todos los pacientes
        this.patients_data_response = response;
        // Llamamos al obejeto vacio previamente definido
        this.patients_data = this.patients_data_response
        .find((m)=>{
          // Se realiza una busqueda en donde se obtiene los id de todos los pacientes registrados,
          // se compara con el id obtenido actualmente
          return (m.id == this.id);           
        });
      });
    }
  }

  // Respaldamos los datos del paciente 
  save_patients_data = () =>{
    // Guardamos los datos de los pacientes, según el objeto local
    this.result_service.saveDataPatients(this.patients_data).subscribe((response) =>{
      // Msotramos mensaje de confirmación del usuario
      confirm('¿Esta segur@ de guardar datos?');
      // Redireccionamos a alguna vista
      //this.router.navigateByUrl('\home');  MODIFICAR
    },(error) => {
      alert("Error: " + error.statusText);
    });
  }

}