import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsPanelComponent } from './forms-panel/forms-panel.component';

@Injectable({
  providedIn: 'root',

})
export class SummaryDataService {

  info: string | null  = ''
  
  constructor(private formsPanel: FormsPanelComponent) {}

  ngOnInit(){
    this.info = this.formsPanel.getClientInformation()
  }

  displayInformation(){
    return this.info
  }
}
