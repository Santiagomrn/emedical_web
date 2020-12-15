import { Component } from '@angular/core';
import { MedicamentService} from "./services/medicament/medicament.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private MedicamentService: MedicamentService){}
  
  title = 'medical-portal';
}
