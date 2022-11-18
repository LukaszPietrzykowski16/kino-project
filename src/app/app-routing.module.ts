import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilmPanelComponent } from './film-panel/film-panel.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component'

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: AdminComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
