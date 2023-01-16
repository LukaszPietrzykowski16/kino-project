
import { Component, Input} from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { map } from 'rxjs';
import { Film } from 'angular-feather/icons';
import { CinemaHallService } from '../cinema-hall.service';



export interface Film {
  title: string
  types: string
  image: string
  description: string
  rating: number
  date: string
  hours: Array<string>
}

@Component({
  selector: 'app-film-panel',
  templateUrl: './film-panel.component.html',
  styleUrls: ['./film-panel.component.css']
})
export class FilmPanelComponent {
  description:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem!'

  arr:Array<Film> = []

  @Input() item: string = '05/12'

 

  shortDescription:string = this.description.substring(0,240)

  flag:boolean = true
 

  constructor(private apiService: ApiServiceService, private cinemaService: CinemaHallService) {}

  more(){
    console.log(this.arr)
    if(this.flag === true) {
      this.flag = false
    } else {
      this.flag = true
    }
  }



  ngOnChanges():void {
    this.apiService.changeDate(this.item).subscribe(response => this.arr = response)

    this.apiService.getFilms()
  
      .subscribe(test => this.arr = test);

  }


  moreDetails(title:string, hour:string){
    this.cinemaService.setStrings(title, hour, this.item)
  }


  // hours of films 
  newArr:Array<string> = []

  currentHour = this.formatDate(new Date());
  
  formatDate(date: { getHours: () => number; getMinutes: () => any;}) {
    return [
      this.padTo2Digits(date.getHours()),
      this.padTo2Digits(date.getMinutes() + 1)
    ].join(':');
  }

  padTo2Digits(num: { toString: () => string; }) {
    return num.toString().padStart(2, '0');
  }



  hours: Array<string> = []

  ngOnInit(){
    
    
   
  }
/*
  ngOnInit(): void {
    
    this.apiService.getFilms().subscribe(response => this.arr = response)

     this.apiService.getFilms()
   
       .subscribe(test => this.arr = test);
  }
  */
  /*
      this.apiService.getFilms().pipe(map(response => response.map(film => ({
        title: film.title,
        imgUrl: film.image,
        desc: film.description,
    }))))
      .subscribe(test => console.log(test))
  
  }
  */
}
