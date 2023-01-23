import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // i need here current day or something
  currentItem = '05-12'

  showNextFilm($event: any) {
    this.currentItem = $event
  }
}
