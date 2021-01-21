import M from 'materialize-css';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DoctorInterface } from "../../interfaces/doctor/doctor-interface";
import {DoctorService} from "../../services/doctor/doctor.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, AfterViewInit{
  doctors:DoctorInterface;
  total:number;

  constructor(private DoctorService:DoctorService,private router: Router) { 
    }

  ngOnInit(): void {
    this.getDoctors()
  }
  getDoctors=()=>{
    this.DoctorService.getDoctors("4","1").then((response) => {
      this.doctors = response;
      this.total=response.info.results;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }
  ngAfterViewInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems,{ fullWidth: true, indicators:true, shift: 2, numVisible: 4, noWrap: false });
  }
  
}
