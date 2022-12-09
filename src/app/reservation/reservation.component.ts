import { Component } from '@angular/core';
import { CinemaHallService } from '../cinema-hall.service';
import { SeatsService } from '../seats.service';
import { FormService } from '../form.service';
import { RouterLink } from '@angular/router';

export interface Seat {
  seat: string,
  avaliable: boolean
}

export interface Ticket {
  seat: string,
  type: string,
  position: number
}

/*
a5 = {
  type: 'normal'
}

*/

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

  // change this array of objecs
  tickets: Array<Ticket> = []

  active: boolean = false;

  public styleArray=new Array<boolean>;

  checkSeat(seat: String){
    this.selectedSeat = `${seat}`
    this.status = !this.status;   
    
  
  }

  removeSeat(place: string){
    
    this.tickets = this.tickets.filter((el) => { return el.seat != place; }); 
   
  }

  changeColor(number:number){
    if(this.styleArray[number] === true){
      this.styleArray[number]=false;
      this.removeSeat(this.selectedSeat)    
    } else {
      this.styleArray[number]=true;
      this.tickets = [... this.tickets, {'seat': this.selectedSeat, 'type': 'bilet normalny', position: number}]
    }

    
  }

  constructor(private cinemaHall: CinemaHallService, private seatsService: SeatsService, private formService: FormService) {}

  ngOnInit(){
    this.header = this.cinemaHall.displayInfo()
    this.seatsService.getSeats()
    .subscribe(response => this.seats = response )
  
  }

  forms(){
    this.formService.form(this.header, this.tickets)
  }

 
}
