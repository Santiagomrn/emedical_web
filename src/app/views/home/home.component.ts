import M from 'materialize-css';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsInterface } from "../../interfaces/news/news-interface";
import { NewsService } from "../../services/news/news.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  news:NewsInterface
  total:number
  constructor(private NewsService:NewsService,private router: Router) {
    this.total=0

   }

  ngOnInit(): void {
    this.getNews();
  }
  getNews=()=>{
    this.NewsService.getNews("10","1","Mexico").then((response) => {
      this.news = response;
      this.total=response.total;
      console.log(response)
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }
  ngAfterViewInit() {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, { fullWidth: true,
      indicators:true,
      duration:200});
  }


}
