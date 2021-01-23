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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  medicaments:MedicamentInterface;
  valueMedicaments:string;
  total:number;
  searchForm;


  /* Variable para pipe */
  conv_data:string;

  url: string = 'https://reqres.in/api/users/';
  totalAngularPackages; // <---
  error;
  /* Paginación */
  public response_resultados: any[] ;        
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre','descripcion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private MedicamentService: MedicamentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    ) { 

      this.searchForm = this.formBuilder.group({
        query: ''
      });
    this.total=0
    this.http = http
  }

  ngOnInit(): void {
    // this.selectComercial = '1';
    // this.selectStrip = '1';
    // this.selectActivePrim = 'true';
    this.getMedicaments("*");
  }
  // Usar servicio para obtener lista de usuarios
  // El servicio equivale a los métodos de JS
  // Cada petición requiere servicio, por tanto. Se requiere servicio de Login.
  // 



  // getComercial(){
  //   this.selectComercial = this.comercial;
  //   console.log(this.selectComercial);
  //   }

  // this.dataSource = new MatTableDataSource(this.response_resultados);
  // this.dataSource.paginator = this.paginator;
  // console.log(this.dataSource);
    getMedicaments(data){
      this.conv_data = data.toUpperCase();
      let _url = this.url+this.searchForm.get('query').value;
      this.http.get<any>(_url).subscribe(data => {
        console.log(data.data);
        this.response_resultados = data.data;
        if(this.searchForm.get('query').value != ""){
          this.dataSource = new MatTableDataSource([data.data]);
          return;
        }
        console.log(this.response_resultados);
       this.dataSource = new MatTableDataSource(this.response_resultados);
       this.dataSource.paginator = this.paginator;
     },
     error => {
    this.dataSource = new MatTableDataSource([]);
     this.error = error;
     }
     );
      // this.response_resultados = [{ 'nombre' : 'Alejandro', 'descripcion' : 'test@test.com'}];

      // this.http.get("https://reqres.in/api/users?page=2")
      // .toPromise()
      // .then((response) => {
      //   this.cachedValues[medicament]=response
      //   resolve(response as MedicamentInterface )
      // }, (error) => {
      //   reject(error);
      // })

  //     this.MedicamentService.getMedicaments(data,this.selectComercial,this.selectStrip,this.selectActivePrim ).then((response) => {  
  //       this.response_resultados = response.resultados;
  // // console.log(this.dataSource);
        
  //       // this.medicaments = response;
  //       this.total=response.totalFilas;
  //     }, (error) => {
  //       alert("Error: " + error.statusText);
  //     })
    }
  
    
    
    ngAfterViewInit() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    }

}
