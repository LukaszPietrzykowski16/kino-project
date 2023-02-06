import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  ShoppingCart,
  Facebook,
  Instagram,
  Youtube,
  Trash2,
} from 'angular-feather/icons';

const icons = {
  ShoppingCart,
  Facebook,
  Instagram,
  Youtube,
  Trash2,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
