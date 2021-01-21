import M from 'materialize-css';
import {AfterViewInit,ElementRef, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { MedicamentService} from "../../services/medicament/medicament.service"
import {FormBuilder} from '@angular/forms';
import { element } from 'protractor';


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

  /* Select comercialización*/
  comercial: string;
  selectComercial: string;

   /* Select tipo de medicamento*/
  strip: string;
  selectStrip: string;

   /* Select activo primario*/
  activeprim: string;
  selectActivePrim: string;

  /* Variable para pipe */
  conv_data:string;

  /* Paginación */
  public response_resultados: any[];        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['imagen','descrition'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  

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

  ngOnInit() {
    this.selectComercial = '1';
    this.selectStrip = '1';
    this.selectActivePrim = 'true';
    this.getMedicaments("ambroxol");
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
    this.conv_data = data.toUpperCase();
    this.MedicamentService.getMedicaments(data,this.selectComercial,this.selectStrip,this.selectActivePrim ).then((response) => {  
      this.response_resultados = response.resultados;

      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      
      this.medicaments = response;
      this.total=response.totalFilas;
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }

  
  
  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }
  
}
