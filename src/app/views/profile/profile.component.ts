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

  /**
   * Valores para la actualización de pacientes 
   */
  patients_input= {
    name: null,
    lastName: null,
    phone: null,
    email: null,
    emergencyPhone: null,
    password: null,
    birthdate: null
  }

  /**
   * Valores para la obteneción de datos del formulario
   */
  frmpatients = this.fb.group({
    frname: ['',Validators.required],
    frlastName:['',Validators.required],
    fremail: ['',Validators.required],
    frpassword: ['',Validators.required],
    frbirthdate: ['',Validators.required],
    frphone: ['',Validators.required],
    fremergencyPhone: ['',Validators.required]
  });

  /**
   * Valor para la obtención del ID del usuario
   */
  id:any;

  /**
   * Valor para la visualización de los datos recibidos por una ID
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
    this.get_patient_ID();
  }

  ngOnInit(): void {
  }

  /**
   * Método para la obtención de datos del paciente
   * @returns los datos de los pacientes mediante una API
   */
  get_patient_ID = () =>{
    this.id = this.route.snapshot.params['id'];    
    if(this.id)
    {
        this.result_service.getDataPatients(this.id).subscribe((response) =>{
          this.patients = response;
        },(error) => {
          Swal.fire('Error',error.statusText,'question')
          this.router.navigateByUrl('\dashboard_appointment'); 
        }); 
    }
  }

  /**
   *  Método para guardar los cambios realizados por los usuarios(Pacientes) 
   */
  save_patients_data = () =>{
    this.patients_input.name = this.frmpatients.get('frname').value;
    this.patients_input.lastName = this.frmpatients.get('frlastName').value;
    this.patients_input.email = this.frmpatients.get('fremail').value;
    this.patients_input.password = this.frmpatients.get('frpassword').value;
    this.patients_input.birthdate = this.frmpatients.get('frbirthdate').value;
    this.patients_input.phone = this.frmpatients.get('frphone').value;
    this.patients_input.emergencyPhone = this.frmpatients.get('fremergencyPhone').value;
    this.id = this.route.snapshot.params['id'];   
      this.result_service.saveDataPatients(this.id,this.patients).subscribe((response) =>{
        confirm('¿Esta segur@ de guardar datos?');
        this.router.navigateByUrl('\home');  
      },(error) => {
        Swal.fire('Error',error.statusText,'question')
      });
  }
}
