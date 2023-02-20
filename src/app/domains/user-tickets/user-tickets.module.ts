import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserTicketsComponent } from './user-tickets.component';

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
    UserTicketsComponent,
  ],
})
export class UserTicketsModule {}
