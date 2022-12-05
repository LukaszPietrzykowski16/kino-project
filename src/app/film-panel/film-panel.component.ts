
import { Component, Input} from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { map } from 'rxjs';
import { Film } from 'angular-feather/icons';



export interface Film {
  title: string
  types: string
  image: string
  description: string
  rating: number
  date: string
}

@Component({
  selector: 'app-film-panel',
  templateUrl: './film-panel.component.html',
  styleUrls: ['./film-panel.component.css']
})
export class FilmPanelComponent {
  description:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolore quisquam, atque molestias distinctio ab numquam hic ipsa a dolores rerum aliquam nisi autem voluptate minima eaque veritatis ratione voluptatem!'

  arr:Array<Film> = []

  @Input() item: string = '01/12'

 

  shortDescription:string = this.description.substring(0,240)

  flag:boolean = true
 

  constructor(private apiService: ApiServiceService) {}

  more(){
    if(this.flag === true) {
      this.flag = false
    } else {
      this.flag = true
    }
  }



  ngOnChanges() {
    this.apiService.changeDate(this.item)
  }

  ngOnInit(): void {
    
    this.apiService.getFilms().subscribe(response => this.arr = response)

     this.apiService.getFilms()
   
       .subscribe(test => this.arr = test);
  /*
      this.apiService.getFilms().pipe(map(response => response.map(film => ({
        title: film.title,
        imgUrl: film.image,
        desc: film.description,
    }))))
      .subscribe(test => console.log(test))
    */
  }

}
