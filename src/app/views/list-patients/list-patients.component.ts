import M from 'materialize-css';
import { AfterViewInit,ElementRef, OnInit, Component, ViewChild } from '@angular/core';
import { PatientsService } from "../../services/patients/patients.service";
import { PatientsInterface } from "../../interfaces/patients/patients-interface";
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { FormBuilder,FormControl, Validators, FormsModule } from '@angular/forms';
import { threadId } from 'worker_threads';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';
import Swal from 'sweetalert2';

/**
 * Componente de angular
 */
@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

/**
 * Valor para la visualización de los datos de los Pacientes recibidos por una API
 */
  patients:PatientsInterface[];

/**
 * Valor para realizar una búsqueda en los datos otorgados del paciente mediante el ID
 */
  search_value:string;

/**
 * Valor para obtener los datos del formulario de búsqueda
 */
  searchForm;

/**
 * Valor para el resultado de la páginación
 */
response_resultados: any[];        

/**
 * Valor para obtener la tabla que se visualizará
 */
dataSource: MatTableDataSource<any>;

/**
 * Valor para determinar las columnas de la tabla a visualizar
 */
displayedColumns: string[] = ['name','lastName','email','birthdate','phone','emergencyPhone'];

/**
 * Valor para realizar la petición de hacer paginación
 */
@ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructor para utilizar modulos importados
   * @param {PatientsService} result_service consumo del servicio de pacientes
   * @param {FormBuilder} formBuilder consumo del modulo para formularios
   * @param {Router} router  consumo del modulo para redireccionar
   * @param {ActivatedRoute} route consumo del modulo obtención de ID
   */
  constructor(
    private result_service:  PatientsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.searchForm = this.formBuilder.group({
        query: ''
      });
     }

  /**
   * Método de angular
   */
  ngOnInit(): void {
    this.get_patients();
  }

/**
 * Método que obtiene todos los datos de los pacientes que puede visualizar un doctor
 * @returns de la lista de pacientes a visualizar por el doctor
 */
  get_patients = () =>{
    this.result_service.getDataListPatients(1,true).subscribe((response) =>{
      this.patients = response;
      this.response_resultados = this.patients;
      this.dataSource = new MatTableDataSource(this.response_resultados);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      Swal.fire('Error',error.statusText,'question')
    });
  }

/**
 * Método que obtiene todos los datos de un paciente que puede visualizar un doctor
 * @returns de los datos de un paciente a visualizar por el doctor
 */
get_patients_id = () =>{
  this.search_value = this.searchForm.get('query').value;
    this.result_service.getDataListPatients(this.search_value,false).subscribe((response) =>{
      this.patients = response;
      this.response_resultados = this.patients;
      this.dataSource = new MatTableDataSource([this.response_resultados]);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      Swal.fire('Error',error.statusText,'question')
    });
  }
}

