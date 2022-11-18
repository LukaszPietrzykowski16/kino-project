import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { ShoppingCart, Facebook, Instagram, Youtube, Trash2 } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  ShoppingCart, 
  Facebook, 
  Instagram, 
  Youtube, 
  Trash2
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }