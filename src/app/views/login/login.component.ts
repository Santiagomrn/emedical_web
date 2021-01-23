import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  role : Object;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  loginForm = new FormGroup({
    mail: new FormControl(''),
    pass: new FormControl(''),
  });

  matcher = new MyErrorStateMatcher();
  constructor(private route: ActivatedRoute, private router: Router, private http : HttpClient) { }
  
  ngOnInit(): void {
  }
  onSubmit() {
    this.loginUser(this.loginForm.value);
  }
  loginUser(login : FormGroup){
    const headers = new Headers;
    headers.append('Access-Control-Allow-Origin', '*');
    console.log("Hi From submit");
    console.warn(this.loginForm.value);
    // Acceder al query params
    this.role =  this.route.snapshot.queryParamMap.get('role');
    // Validar mediante API
    console.log("https://medicalportal.herokuapp.com/api/v1/login/"+this.role);
    let _url ="https://medicalportal.herokuapp.com/api/v1/login/"+this.role ;
    this.http.get<any>(_url, { headers: headers }).subscribe(data => {
      console.log(data.data); 
   },
   error => {
    console.log(error);
    }
   );






    // Guardar token 
    // let key = '1';
    // localStorage.setItem('token', key);
    // let route = this.role;
    // this.router.navigate([route]);
  }

}
