import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormInfoService {

  info: string | null = ''


  setInformation(information: string | null){
    this.info = information
  }

  getInformation(){
    return this.info
  }

  constructor() { }
}
