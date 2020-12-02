import {Component,OnInit} from '@angular/core';
import { NewsInterface } from "../../interfaces/news/news-interface";
import { NewsService } from "../../services/news/news.service";
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  news:NewsInterface
  total:number
  constructor(private NewsService:NewsService) {
    this.total=0
   }
   ngOnInit(){
    this.getNews()
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
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

}
