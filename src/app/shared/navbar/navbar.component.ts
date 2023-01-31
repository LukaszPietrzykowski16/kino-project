import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  login = false;
  userId: number = NaN;

  constructor(private router: Router) {}

  navigateTo(value: any) {
    if (value) {
      this.router.navigate([value.value]);
    }
    return false;
  }

  ngOnInit() {
    this.authService.isAuth$.subscribe((test) => {
      this.login = test.hasAuth;
    });

    this.authService.user$.subscribe((user) => {
      this.userId = user.id;
    });
  }
}
