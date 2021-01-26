import { Component, OnInit } from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    patients:PatientsInterface = {
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
  patients_birthdate: any;
 
  constructor(
    private result_service:  PatientsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    // Llamamos a la obtención de los pacientes mediante ID
    this.get_patient_ID();
  }

  ngOnInit(): void {
  }


    // Para todos los datos hacemos uso de (null,'1')
  // Para un dato especifico (id,'2')

  //Obtenemos los datos mediante el id
  get_patient_ID = () =>{
    // Obtenemos el id del paciente mediante la URL
    this.id = this.route.snapshot.params['id'];    
    console.log(this.id);
    // Verificamos la existencia del parámetro 
    if(this.id){
        // Hacemos uso del servicio para la obtención de datos de la interfaz
        this.result_service.getDataPatients(this.id,false).subscribe((response:PatientsInterface[]) =>{

        // Respaldamos la información de todos los pacientes
        this.patients_data_response = response;

    


        console.log(this.patients_data_response);
        
        // Llamamos al obejeto vacio previamente definido
        this.patients = this.patients_data_response
        .find((m)=>{
          console.log(m.id);
          // Se realiza una busqueda en donde se obtiene los id de todos los pacientes registrados,
          // se compara con el id obtenido actualmente
          return (m.id == this.id);           
        });
        console.log(this.patients);

        
        /*
        // Respaldamos el valor de birthdate
        this.patients_birthdate = this.patients.birthdate;
        // Limitamo el valor de birthdate para que se vea en la vista
        this.patients.birthdate = this.patients.birthdate.substr(0,10);*/
      }); 
    }

  }

  // Respaldamos los datos del paciente 
  save_patients_data = () =>{
    // Regresamos el valor actual de birthdate
    this.patients.birthdate = this.patients_birthdate;
    //console.log(this.patients);
    // Guardamos los datos de los pacientes, según el objeto local
    this.result_service.saveDataPatients(this.patients).subscribe((response) =>{
      // Msotramos mensaje de confirmación del usuario
      confirm('¿Esta segur@ de guardar datos?');
      // Redireccionamos a alguna vista
      this.router.navigateByUrl('\home');  
    },(error) => {
      alert("Error: " + error.statusText);
    });

  }

}
