import { Injectable } from '@angular/core';
import { Ticket } from './reservation/reservation.component';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  info: Array<String | undefined> = [] 
  arrayTickets: Array<Ticket> = []
  
  form(information: Array<String | undefined>, tickets: Array<Ticket>){
    console.log(information)
    this.info = information
    this.arrayTickets = tickets
  }

  displayTitle(){
    return this.info
  }

  displaySeats(){
    return this.arrayTickets
  }

  constructor() { }
}
