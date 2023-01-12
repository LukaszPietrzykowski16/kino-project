import { Component } from '@angular/core';
import getPassword from '../../passwords';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  ngOnInit() {
    console.log(getPassword());
  }
}
