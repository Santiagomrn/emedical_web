import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { MedicamentInterface} from "../../interfaces/medicament/medicament-interface";
import { MedicamentService} from "../../services/medicament/medicament.service"

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.css']
})
export class MedicamentsComponent implements OnInit {
  medicaments:MedicamentInterface;
  search_value:string;
  total:number;
  constructor( private MedicamentService: MedicamentService,private router: Router,private route: ActivatedRoute) { 
    this.total=0
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
    this.search_value = params.get('query');
    this.getMedicaments();
    })
  }

  searchMedicaments = () => {
    this.medicaments= null;
    this.router.navigate(['/medicaments/' + this.search_value])
    } 
    
  getMedicaments(){
    this.MedicamentService.getMedicaments_("1",this.search_value).then((response) => {
      this.medicaments = response;
      this.total=response.totalFilas;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }



}
