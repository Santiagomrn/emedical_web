import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
/**
 * Componente de Login
 * 
 * 
 * Inicio de sesión
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * Rol del usuario
   */
  role : string;
  /**
   * Validadores de email
   */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  /**
   * Formulario de Inicio de sesión
   */
  loginForm = new FormGroup({
    mail: new FormControl(''),
    pass: new FormControl(''),
  });
  /**
   *  Variable de material ui
   */
  matcher = new MyErrorStateMatcher();
  /**
   * Constructor de componente
   * @param route 
   * @param router 
   * @param http 
   */
  constructor(private route: ActivatedRoute, private router: Router, private http : HttpClient) { }
  /**
   * Método Angular
   */
  ngOnInit(): void {
  }
  /**
   * Método enlazado a botón para enviar formulario
   * @returns invocación a LoginUser()
   */
  onSubmit() {
    this.loginUser(this.loginForm.value);
  }
  /**
   * Funcion que recibe el formulario para realizar la petición
   * @param {login}
   * @return POST al login
   */
  loginUser(login : FormGroup){
    const headers = new Headers;
    // Acceder al query params
    this.role =  this.route.snapshot.queryParamMap.get('role');
    // Validar mediante API
    console.log("https://medicalportal.herokuapp.com/api/v1/login/"+this.role);
    let _url ="https://medicalportal.herokuapp.com/api/v1/login/"+this.role;
    var self = this;
    this.http.post<any>(_url, 
      {
      email : this.loginForm.get("mail").value,
      password : this.loginForm.get("pass").value,
      }
      ).subscribe(data => {
      let key = data.token;
      let role = self.role;
      let id = data.id;
      localStorage.setItem('token', key );
      localStorage.setItem('role', role );
      localStorage.setItem('login', '1' );
      localStorage.setItem('id' , id );
    this.router.navigate(['home']);
    },
    error => {
      alert("Usuario y/o contraseña erróneo");
      localStorage.setItem('login', '0' );
    console.log(error);
    }
   );

  }

}
/** 
 * Error when invalid control is dirty, touched, or submitted. 
 **/
export class MyErrorStateMatcher implements ErrorStateMatcher {
  /**
   * Variable que valida el correo
   * @param control 
   * @param form 
   * @returns boolean
   */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}