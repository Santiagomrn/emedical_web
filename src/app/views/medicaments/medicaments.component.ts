import M from 'materialize-css';
import {AfterViewInit,ElementRef, OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { MedicamentService} from "../../services/medicament/medicament.service";
import {FormBuilder} from '@angular/forms';
import { element } from 'protractor';

/**
 * Componente de medicamentos
 */
@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  /**
   * Interfaz de medicamentos
   * @type MedicamentInterface
   * 
   */
  medicaments:MedicamentInterface;
  /**
   * Valor del medicamento actual
   */
  valueMedicaments:string;
  /**
   * Total de resultados
   * 
   */
  total:number;
  /**
   * Medicamento a buscar
   */
  searchForm;

  /**  Select comercialización
   * 
  */
  comercial: string;
  /**
   * Select comercial
   */
  selectComercial: string;

   /**  Select tipo de medicamento*/
  strip: string;
  /**Select de Strip */
  selectStrip: string;

   /**  Select activo primario*/
  activeprim: string;
  /**
   * Select Activo
   */
  selectActivePrim: string;

  /**
   * Variable de binding
   */
  conv_data:string;

  /** Paginación*/ 
  public response_resultados: any[];       
  /**
   * Datos de la tabla
   *  */ 
  dataSource: MatTableDataSource<any>;
  /**
   * Nombre de las columnas de la tabla
   */
  displayedColumns: string[] = ['imagen','descrition'];
  /**
   * Paginación
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;
/**
 * Constructor 
 * @param MedicamentService Datos de medicamentos
 * @param router 
 * @param route 
 * @param formBuilder 
 */
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
/**
 * Se realiza una búsqueda por default ["ambroxol"]
 */
  ngOnInit() {
    this.selectComercial = '1';
    this.selectStrip = '1';
    this.selectActivePrim = 'true';
    this.getMedicaments("ambroxol");
  }
/**
 * Se obtiene el valor del selector
 */
  getComercial(){
  this.selectComercial = this.comercial;
  console.log(this.selectComercial);
  }
  /**
 * Se obtiene el valor del selector strip
 */

  getStrip(){
    this.selectStrip = this.strip;
    console.log(this.selectStrip);
    }
/**
 * Se obtiene el valor del Activo
 */
  getActive(){
    this.selectActivePrim = this.activeprim;
    console.log(this.selectActivePrim);
  }
      
  /**
   * Obtener lista de medicamentos 
   * @param data Se pasa el medicamento a buscar
   * @returns MedicamentInterface
   */
  getMedicaments(data){
    this.conv_data = data.toUpperCase();
    this.MedicamentService.getMedicaments(data,this.selectComercial,this.selectStrip,this.selectActivePrim ).then((response) => {  
      this.response_resultados = response.resultados;
      console.log(response.resultados);
      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      
      this.medicaments = response;
      this.total=response.totalFilas;
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }

  /**
   * Inicialización de Materialize CSS
   */
  
  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }
  
}
