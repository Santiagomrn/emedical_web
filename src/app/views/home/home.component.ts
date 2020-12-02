import M from 'materialize-css';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {
   }

  ngOnInit(): void {
    //this.getNews();
  }
  ngAfterViewInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, { fullWidth: true,
      indicators:true,
      duration:200});
  }


}
