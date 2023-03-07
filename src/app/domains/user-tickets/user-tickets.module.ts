import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserTicketsComponent } from './user-tickets.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserTicketsComponent,
      },
    ]),
  ],
})
export class UserTicketsModule {}
