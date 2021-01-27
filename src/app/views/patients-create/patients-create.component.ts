import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

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

  constructor( private http : HttpClient) { }
  onSubmit() {
    this.createUser(this.userCreateForm.value);
  }
  createUser(crearUser : FormGroup){
    console.warn(this.userCreateForm.value);
    console.log(this.userCreateForm.get("name").value);
    const _url = "https://medicalportal.herokuapp.com/api/v1/pathient";
    const body = JSON.stringify({
      name : this.userCreateForm.get("name").value,
      lastname : this.userCreateForm.get("lastName").value,
      phone : this.userCreateForm.get("phone").value,
      email : this.userCreateForm.get("email").value,
      emergencyPhone : this.userCreateForm.get("emergencyPhone").value,
      password : this.userCreateForm.get("password").value,
      birthdate : this.userCreateForm.get("birthdate").value,
    });
    const _headers = new Headers;
    _headers.append('Access-Control-Allow-Origin', '*');
    console.log(body);
    this.http.post(_url, body ).subscribe(data => {
      console.log(data); 
   },
   error => {
    console.log(error);
    }
   );

  }
  ngOnInit(): void {
  }

}
