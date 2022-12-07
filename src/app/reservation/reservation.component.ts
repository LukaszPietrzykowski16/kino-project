import { Component } from '@angular/core';
import { CinemaHallService } from '../cinema-hall.service';
import { SeatsService } from '../seats.service';


export interface Seat {
  seat: string,
  avaliable: boolean
}

export interface Payload {
  seat: string,
  type: string
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

  payload: string[][] = []

  active: boolean = false;

  public styleArray=new Array<boolean>;

  checkSeat(seat: String){
    this.selectedSeat = `${seat}`
    this.status = !this.status;   
    
  
  }

  changeColor(number:number){
    console.log(this.payload)
    if(this.styleArray[number] === true){
      this.styleArray[number]=false;
      this.payload.pop()
  
    } else {
      this.styleArray[number]=true;
      this.payload.push([this.selectedSeat, 'bilet normalny'])
    }

    
  }

  constructor(private cinemaHall: CinemaHallService, private seatsService: SeatsService) {}

  ngOnInit(){
    this.header = this.cinemaHall.displayInfo()
    this.seatsService.getSeats()
    .subscribe(response => this.seats = response )
  
  }


 
}
