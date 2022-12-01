import { Injectable } from '@angular/core';

export interface Root {
  title: string
  types: string
  image: string
  description: string
  rating: number
  date: string
}

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  date = '01-12'
  url = `http://localhost:3000/films?date=${this.date}`
  

  async getFilms(){
    const res = await fetch(this.url);
    console.log(res.json())
    return await res.json();
  }
  constructor() { }
}
