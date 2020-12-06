import M from 'materialize-css';
import { Component,OnInit,ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { MedicamentService} from "../../services/medicament/medicament.service"
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  medicaments:MedicamentInterface;
  valueMedicaments:string;
  total:number;
  searchForm;
  constructor( 
    private MedicamentService: MedicamentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { 

      this.searchForm = this.formBuilder.group({
        query: ''
      });

    this.total=0
  }

  ngOnInit(): void { 
  this.route.paramMap.subscribe((params: ParamMap)=>{
    this.valueMedicaments = params.get('query');
    this.getMedicaments("ambroxol");
    })
  }
    
  getMedicaments(data){
    console.log(data)
    this.MedicamentService.getMedicaments("1",data).then((response) => {
      this.medicaments = response;
      this.total=response.totalFilas;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }

  
}
