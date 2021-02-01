import M from 'materialize-css';
import {AfterViewInit,Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
/**
 * Componente de Creación de Doctor
 * Usado por el manager 
 */
@Component({
  selector: 'app-doctors-create',
  templateUrl: './doctors-create.component.html',
  styleUrls: ['./doctors-create.component.css']
})
export class DoctorsCreateComponent implements OnInit,AfterViewInit {
  /**
   * Constructor
   * @param _location Variable necesaria para retornar a la página previa
   * @param {Router} router  consumo del modulo para redireccionar
   * @param http 
   */
  constructor( 
    private _location : Location,
    private router: Router,
    private http: HttpClient,
    ) { }
/**
 * Formulario para la creación de Doctor
 */
  doctorForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    emergencyPhone: new FormControl(''),
    password: new FormControl(''),
    birthdate: new FormControl(''),
    medicalArea: new FormControl(''),
    description: new FormControl(''),
    jobTitle: new FormControl(''),
    professionalLicense: new FormControl(''),
    nationality: new FormControl(''),
    maritalStatus: new FormControl(''),
  });
  /**
   * Método de Angular
   */
  ngOnInit(): void {
  }
/**
 * Se inicializa Materialize CSS
 */
  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }
  /**
   * Se retorna una página previa en el historial del usuario
   */
  volver(){
    this._location.back();
  }
  /**
   * Ejecución para el envío del formulario de creación de un doctor
   * Invoca a CrearDoctor()
   */
  onSubmit(){
    this.crearDoctor(this.doctorForm.value);
  }
  /**
   * 
   * Se crea un doctor con los datos proporcionados por el Manager
   * Se requiere el Token y el Rol
   * @param doctor Se pasa como parámetro el formulario llenado previamente
   */
  crearDoctor(doctor : FormGroup){
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(this.doctorForm.get("name").value);
    console.log(this.doctorForm.get("maritalStatus").value);
    console.log(this.doctorForm.get("birthdate").value);
    console.log(this.doctorForm.get("medicalArea").value);
    const _url = "https://medicalportal.herokuapp.com/api/v1/doctor";
    var self = this;
    const HeadersForPatientsAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (token)
    });
    const body = {
      name : this.doctorForm.get("name").value,
      lastName : this.doctorForm.get("lastName").value,
      phone : this.doctorForm.get("phone").value,
      email : this.doctorForm.get("email").value,
      emergencyPhone : this.doctorForm.get("emergencyPhone").value,
      password : this.doctorForm.get("password").value,
      birthdate : this.doctorForm.get("birthdate").value,
      medicalArea : this.doctorForm.get("medicalArea").value,
      description : this.doctorForm.get("description").value,
      jobTitle : this.doctorForm.get("jobTitle").value,
      professionalLicense : this.doctorForm.get("professionalLicense").value,
      nationality : this.doctorForm.get("nationality").value,
      maritalStatus : this.doctorForm.get("maritalStatus").value,
    }
    this.http.post<any>(_url, JSON.stringify(body), { headers: HeadersForPatientsAPI } ).subscribe(data => {
      
      Swal.fire({icon: 'success',title: 'Cuenta creada!',showConfirmButton: false,timer: 1250})
        this.router.navigateByUrl('/home');  
    },
    error => {
      Swal.fire('Email existente',error.statusText,'question')
    }
   );
  }
}
