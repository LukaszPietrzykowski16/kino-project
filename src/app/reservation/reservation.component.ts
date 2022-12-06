import { Component } from '@angular/core';
import { CinemaHallService } from '../cinema-hall.service';
import { SeatsService } from '../seats.service';


export interface Seat {
  seat: string,
  avaliable: boolean
}


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})


export class ReservationComponent {
  // i need to mock up this from server so it's basically a bad aproach to change!

  header: Array<String> = []
  seats: Array<Seat> = []

  selectedSeat:string = ''
 
  letters: Array<String> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'F']

  checkSeat(letter: String, seat: String){
    this.selectedSeat = `${letter}${seat}`
  }

  constructor(private cinemaHall: CinemaHallService, private seatsService: SeatsService) {}

  ngOnInit(){
    this.header = this.cinemaHall.displayInfo()
    this.seatsService.getSeats()
    .subscribe(response => this.seats = response )
  
  }


 
}
