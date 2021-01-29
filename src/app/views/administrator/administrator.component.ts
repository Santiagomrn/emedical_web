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
/**
 * Componente de administración. 
 * 
 * El manager es capaz de crear nuevos doctores
 * 
 * Puede visualizar los doctores
 * @class AdministratorComponent
 * @implements {onInit}
 */
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
/**
 * Componente de administración
 */
export class AdministratorComponent implements OnInit { 
/**
 * Variable de formulario
 * @type {form}
 */
  searchForm;
  /**
   * Variable para verificar el rolk
   * @type {string}
   */
  role : string;

  /**
   * Variable de búsqueda 
   * @type {string}
   */
  conv_data:string;
/**
 *  Dirección de la API de NodeJS
 */
  url: string = 'https://medicalportal.herokuapp.com/api/v1/doctor/';
  /**
   * Variable de error
   */
  error;
  /**
   * Paginación 
   * @type {any}
   */
  public response_resultados: any[] ;
  /** 
   * Inicializador de la tabla
   */        
  dataSource: MatTableDataSource<any>;
  /**
   * Nombre de la cabecera de la tabla
   */
  displayedColumns: string[] = ['nombre','descripcion'];
  /**
   * Variable necesaria para la paginación
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Constructor del componente
   * @param {router} Router
   * @param {route} Route
   * @param {formBuilder} FormBuilder
   * @param {http} http
   */
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    ) { 
      /**
       * Variable donde se almacena formulario
       */
      this.searchForm = this.formBuilder.group({
        query: ''
      });
      /**
       *  Variable para instanciar el módulo HTTP
       */
    this.http = http
  }
  /**
   * Se ejecuta al iniciar 
   * Método de angular
   * @return void
   */
  ngOnInit(): void {
    this.role  = this.readLocalStorageValue('role');
    this.getDoctors("*");
  }
  // Usar servicio para obtener lista de usuarios
  // Cada petición requiere servicio, por tanto. Se requiere servicio de Login.
  // 
  /**
   * Método que devuele los doctores
   * @param {data}
   * 
   * @returns Se retornan los doctores para ser mostrados en tabla
   */
    getDoctors(data){
        this.conv_data = data.toUpperCase();
        let _url = this.url+this.searchForm.get('query').value;
      this.http.get<any>(_url).subscribe(data => {
          console.log(data);

          this.response_resultados = data;
          if(this.searchForm.get('query').value != ""){
            this.dataSource = new MatTableDataSource([data]);
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
    }
  /**
   * Método para leer el localStorage
   * @param key (rol)
   * @returns El valor del localstorage, para saber el rol que se tiene
   */
    readLocalStorageValue(key: string): string {
      return localStorage.getItem(key);
    }
    /**
     * Inicializador de la tabla
     * @param null
     * @returns null
     */
    ngAfterViewInit() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    }

}
