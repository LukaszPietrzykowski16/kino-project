import { Component } from '@angular/core';
import { CinemaHallService } from '../cinema-hall.service';
import { SeatsService } from '../seats.service';
import { FormService } from '../form.service';
import { RouterLink } from '@angular/router';
import { ExtraApiService } from '../extra-api.service';
import { Film } from '../film-panel/film-panel.component';

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
  newHeader: Array<Film> = []
  seats: Array<Seat> = []
  exactHour: string = ''

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
    console.log(this.newHeader)
    
  }

  constructor(private cinemaHall: CinemaHallService, private seatsService: SeatsService, private formService: FormService, private extraCall: ExtraApiService) {}

  ngOnInit(){
    
    this.header = this.cinemaHall.displayInfo()
    this.seatsService.getSeats()
    .subscribe(response => this.seats = response )
    if(this.header[0] === '' || this.header[1] === '' || this.header[2] === '' ){
      this.extraCall.displayInfoFromUrl()
        .subscribe(response => this.newHeader = response)
      this.exactHour = this.extraCall.getExactDate()
       
    }
    
    
  }

  test(arrOfHours: Array<string>){
    const statment = arrOfHours.map((oneHour) => oneHour.includes(this.exactHour))
    if(statment.includes(true)){
      return this.exactHour
    } else {
      return
    }
   
  
    
  }

  forms(){
    this.formService.form(this.header, this.tickets)
  }

 
}
