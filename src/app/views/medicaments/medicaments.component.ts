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
  comercial: string;
  selectComercial: string;

  strip: string;
  selectStrip: string;

  activeprim: string;
  selectActivePrim: string;

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
    this.selectComercial = '1';
    this.selectStrip = '1';
    this.selectActivePrim = 'true';
    this.getMedicaments("ambroxol");
    })
  }

  getComercial(){
  this.selectComercial = this.comercial;
  console.log(this.selectComercial);
  }

  getStrip(){
    this.selectStrip = this.strip;
    console.log(this.selectStrip);
    }

  getActive(){
    this.selectActivePrim = this.activeprim;
    console.log(this.selectActivePrim);
  }
      
    
  getMedicaments(data){
    console.log(data)
    this.MedicamentService.getMedicaments("1",data,this.selectComercial,this.selectStrip,this.selectActivePrim ).then((response) => {
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
