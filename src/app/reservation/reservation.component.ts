import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  seats: Array<Number> = []
  letters: Array<String> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'F']

  checkSeat(letter: any, seat: any){
    console.log(letter, seat)
  }


  ngOnInit(){
    for(let i = 0; i<11; i++){
      // i can't do this with spread operator for some reason
      this.seats.push(i)
    }
    console.log(this.seats)
  }
}
