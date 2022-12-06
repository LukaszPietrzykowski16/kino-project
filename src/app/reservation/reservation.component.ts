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
  status: boolean = false;

  active: boolean = false;

  public styleArray=new Array<boolean>;

  checkSeat(seat: String){
    this.selectedSeat = `${seat}`
    console.log(this.selectedSeat)
    this.status = !this.status;   
  }

  changeColor(number:number){
    if(this.styleArray[number] === true){
      this.styleArray[number]=false;
    } else {
      this.styleArray[number]=true;
    }

    
  }

  constructor(private cinemaHall: CinemaHallService, private seatsService: SeatsService) {}

  ngOnInit(){
    this.header = this.cinemaHall.displayInfo()
    this.seatsService.getSeats()
    .subscribe(response => this.seats = response )
  
  }


 
}
