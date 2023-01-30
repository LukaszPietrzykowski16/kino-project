import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  login = false;

  ngOnInit() {
    this.authService.isAuth$.subscribe((test) => {
      this.login = test.hasAuth;
    });
  }
}
