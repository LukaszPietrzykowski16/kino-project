import { Injectable } from '@angular/core';
import { Ticket } from './reservation/reservation.component';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  info: Array<String> = []
  arrayTickets: Array<Ticket> = []
  
  form(information: Array<String>, tickets: Array<Ticket>){
    this.info = information
    this.arrayTickets = tickets
  }

  displayInfo(){
    
  }

  constructor() { }
}
