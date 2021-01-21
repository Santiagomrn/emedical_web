import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  loginForm = new FormGroup({
    mail: new FormControl(''),
    pass: new FormControl(''),
  });

  matcher = new MyErrorStateMatcher();
  constructor() { }
  
  ngOnInit(): void {
  }
  onSubmit() {
    this.loginUser(this.loginForm.value);
  }
  loginUser(login : FormGroup){
    console.log("Hi From submit");
    console.warn(this.loginForm.value);
    // Validar mediante API

    // Guardar token 
    let key = '1';
    localStorage.setItem('token', key);
  }

}
