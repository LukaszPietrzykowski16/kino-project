import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormInfoService {
  info: Array<String | null> = [];

  setInformation(
    name: string | null,
    secondName: string | null,
    email: string | null,
    phoneNumber: string | null
  ) {
    this.info = [...this.info, name, secondName, email, phoneNumber];
  }

  get getInformation() {
    return this.info;
  }

  constructor() {}
}
