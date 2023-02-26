import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserTicketComponent } from './user-ticket/user-ticket.component';

@NgModule({
  declarations: [UserTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserTicketComponent,
      },
    ]),
  ],
})
export class UserTicketsModule {}
