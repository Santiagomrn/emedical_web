import M from 'materialize-css';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
/**
 * Componente principal [vista Home]
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  /**
   * Constructor del componente
   * @param router 
   */
  constructor(private router: Router) {
   }
   /**
    * Método Angular
    */
  ngOnInit(): void {
    //this.getNews();
  }
  /**
   * Se inicializa el carousel
   */
  ngAfterViewInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, { fullWidth: true,
      indicators:true,
      duration:200});
  }


}
