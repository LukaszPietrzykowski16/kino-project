import { Component } from '@angular/core';
import { CinemaHallService } from '../cinema-hall.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  // i need to mock up this from server so it's basically a bad aproach to change!

  header: Array<String> = []

  selectedSeat:string = ''
  seats: Array<Number> = []
  letters: Array<String> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'F']

  checkSeat(letter: String, seat: Number){
    this.selectedSeat = `${letter}${seat}`
    console.log(this.selectedSeat)
  }

  constructor(private cinemaHall: CinemaHallService) {}

  ngOnInit(){
    this.header = this.cinemaHall.displayInfo()
    for(let i = 0; i<11; i++){
      // i can't do this with spread operator for some reason
      this.seats.push(i)
    }
  }
}
