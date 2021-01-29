import { Component, OnInit } from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  patients_input:PatientsInterface= {
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

  frmpatients = this.fb.group({
    frname: ['',Validators.required],
    frlastName:['',Validators.required],
    fremail: ['',Validators.required],
    frpassword: ['',Validators.required],
    frbirthdate: ['',Validators.required],
    frphone: ['',Validators.required],
    fremergencyPhone: ['',Validators.required]
  });

  
  testing:any;
  id:any;
  patients: PatientsInterface;

 
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

  //Obtenemos los datos mediante el id
  get_patient_ID = () =>{
    // Obtenemos el id del paciente mediante la URL
    this.id = this.route.snapshot.params['id'];    
    console.log(this.id);
    // Verificamos la existencia del parámetro 
    if(this.id){
      // Hacemos uso del servicio para la obtención de datos de la interfaz
      this.result_service.getDataPatients(this.id).subscribe((response) =>{
        // Respaldamos la información de todos los pacientes
        this.patients = response;
        console.log(this.patients);
      },(error) => {
        // Mostramos mensaje de error
        Swal.fire('Error',error.statusText,'question')
        // Redireccionamos
       this.router.navigateByUrl('\dashboard_appointment'); 
     }); 
    }
  }

  // Respaldamos los datos del paciente 
  save_patients_data = () =>{

    // Respaldamos los datos del formulario, mediante un fórmulario reactivo
    this.patients_input.name = this.frmpatients.get('frname').value;
    this.patients_input.lastName = this.frmpatients.get('frlastName').value;
    this.patients_input.email = this.frmpatients.get('fremail').value;
    this.patients_input.password = this.frmpatients.get('frpassword').value;
    this.patients_input.birthdate = this.frmpatients.get('frbirthdate').value;
    this.patients_input.phone = this.frmpatients.get('frphone').value;
    this.patients_input.emergencyPhone = this.frmpatients.get('fremergencyPhone').value;

    console.log(this.patients);
  
    this.id = this.route.snapshot.params['id'];   
    // Guardamos los datos de los pacientes, según el objeto local
  this.result_service.saveDataPatients(this.id,this.patients).subscribe((response) =>{
      // Msotramos mensaje de confirmación del usuario
      confirm('¿Esta segur@ de guardar datos?');
      // Redireccionamos a alguna vista
      this.router.navigateByUrl('\home');  
    },(error) => {
      // Mostramos mensaje de error
      Swal.fire('Error',error.statusText,'question')
   });

  }

  

}
