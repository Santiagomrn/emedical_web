import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PatientsService } from '../../services/patients/patients.service';
/**
 * Componente de creación de paciente
 */
@Component({
  selector: 'app-patients-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.css']
})
export class PatientsCreateComponent implements OnInit {
  /**
   * Formulario para la creación de un usuario
   */
  userCreateForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    emergencyPhone: new FormControl(''),
    password: new FormControl(''),
    birthdate: new FormControl(''),
  });
  /**
   * Constructor
   * @param http 
   * @param Pathient Interfaz de paciente
   */
  constructor( private http : HttpClient,
    private Pathient : PatientsService
    ) { }
    /**
     * Botón de enviar formulario
     * 
     * Invoca la función createUser()
     */
  onSubmit() {
    this.createUser(this.userCreateForm.value);
  }
  /**
   * Método para la creación de un usuario [paciente]
   * @param crearUser 
   * @returns Pathient
   */
  createUser(crearUser : FormGroup){
    console.warn(this.userCreateForm.value);
    console.log(this.userCreateForm.get("name").value);
    const body = {
      name : this.userCreateForm.get("name").value,
      lastName : this.userCreateForm.get("lastName").value,
      phone : this.userCreateForm.get("phone").value,
      email : this.userCreateForm.get("email").value,
      emergencyPhone : this.userCreateForm.get("emergencyPhone").value,
      password : this.userCreateForm.get("password").value,
      birthdate : this.userCreateForm.get("birthdate").value,
    };
    // Invocar servicio
    this.Pathient.savePatient(body).subscribe((response) => {
        // Mostramos mensaje de paciente creada
        Swal.fire({icon: 'success',title: 'Paciente creado!',showConfirmButton: false,timer: 1250})
    
    },(error) => {
      // Mostramos mensaje de error
      Swal.fire('Error',error.statusText,'question') 
    });

  }
  /**
   * Método de angular
   */
  ngOnInit(): void {
  }

}
