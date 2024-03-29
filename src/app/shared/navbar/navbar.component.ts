import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  login = false;
  userName: string = '';

  logOut() {
    this.authService.logOut();
  }

  login$ = this.authService.isAuth$.pipe(map((isAuth) => isAuth.hasAuth));

  ngOnInit() {
    this.authService.isAuth$.pipe(take(1)).subscribe((test) => {
      this.login = test.hasAuth;
    });

    this.authService.user$.subscribe((user) => {
      this.userName = user.firstName;
    });
  }
}
