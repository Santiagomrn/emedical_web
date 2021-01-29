import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PatientsService } from '../../services/patients/patients.service';
@Component({
  selector: 'app-patients-create',
  templateUrl: './patients-create.component.html',
  styleUrls: ['./patients-create.component.css']
})
export class PatientsCreateComponent implements OnInit {
  
  userCreateForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    emergencyPhone: new FormControl(''),
    password: new FormControl(''),
    birthdate: new FormControl(''),
  });

  constructor( private http : HttpClient,
    private Pathient : PatientsService
    ) { }
  onSubmit() {
    this.createUser(this.userCreateForm.value);
  }
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
  ngOnInit(): void {
  }

}
