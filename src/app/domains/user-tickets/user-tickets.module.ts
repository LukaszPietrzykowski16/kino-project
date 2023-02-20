import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserTicketsComponent } from './user-tickets.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserTicketsComponent,
      },
    ]),
    CommonModule,
    BrowserModule,
    UserTicketsComponent,
  ],
})
export class UserTicketsModule {}
