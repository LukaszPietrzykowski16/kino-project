import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { LoginComponent } from './login/login.component';
import { userReducer } from './store/user.reducer';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
        children: [
          {
            path: 'login',
            loadChildren: () => import('./login/login.module'),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    StoreModule.forRoot(),
    EffectsModule.forRoot([]),
  ],
})
export default class AuthModule {}
