import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { MedicamentService} from "../../services/medicament/medicament.service"
@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  medicaments:MedicamentInterface
  total:number
  constructor( private MedicamentService:MedicamentService,private router: Router) { 
    this.total=0
  }

  ngOnInit(): void {
    this.getMedicaments()
  }

  getMedicaments=()=>{
    this.MedicamentService.getMedicaments("1","aspirina").then((response) => {
      this.medicaments = response;
      this.total=response.totalFilas;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }
}
