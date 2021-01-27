import M from 'materialize-css';
import {AfterViewInit,Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
// import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { HttpClient, HttpClientModule,  HttpHeaders , HttpResponse} from '@angular/common/http';
@Component({
  selector: 'app-doctors-create',
  templateUrl: './doctors-create.component.html',
  styleUrls: ['./doctors-create.component.css']
})
export class DoctorsCreateComponent implements OnInit,AfterViewInit {

  constructor( 
    private _location : Location,
    private http: HttpClient,
    ) { }

  doctorForm = new FormGroup({
    name: new FormControl('nuevo d3'),
    lastName: new FormControl('last name3'),
    phone: new FormControl('123334542'),
    email: new FormControl('sa3@hotmail.com'),
    emergencyPhone: new FormControl('123456772'),
    password: new FormControl('1234'),
    birthdate: new FormControl('2020-11-13'),
    medicalArea: new FormControl('médico general'),
    description: new FormControl('hola soy una prueba'),
    jobTitle: new FormControl('medico'),
    professionalLicense: new FormControl('123343243'),
    nationality: new FormControl('mexicana'),
    maritalStatus: new FormControl('casado'),
  });
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }
  volver(){
    // alert("Regresando...");
    this._location.back();
  }
  onSubmit(){
    this.crearDoctor(this.doctorForm.value);
  }
  crearDoctor(doctor : FormGroup){
    // obtener Token y rol 
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(this.doctorForm.get("name").value);
    console.log(this.doctorForm.get("maritalStatus").value);
    console.log(this.doctorForm.get("birthdate").value);
    console.log(this.doctorForm.get("medicalArea").value);
    const _url = "https://medicalportal.herokuapp.com/api/v1/doctor";
    var self = this;
    // const httpOptions = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // })
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Accept" : "application/vnd.api+json",
    //     "Content-Type" : "application/json",
    //     "Authorization": 'Bearer ' + localStorage.getItem("token")
    //   })
    // };
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Accept" : "application/vnd.api+json",
    //     "Content-Type" : "application/json",
    //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJtYW5hZ2VyIiwiaWQiOjEsImlhdCI6MTYxMTU5NzUyNiwiZXhwIjoxNjExNTk5MzI2fQ.miUHMNe7WzhkQrgTrN-RYwb4Qks1qv3V6Z2INTfjGPw"
    //   })
    // };
    const HeadersForPatientsAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (token)
    });
    // var headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    // headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions({headers : headers});
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
    this.http.post<any>(_url, body, { headers: HeadersForPatientsAPI } ).subscribe(data => {
      console.log(data); 
    },
    error => {
    console.log(error);
    }
   );
  }
}
