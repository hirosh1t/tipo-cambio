import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  
  constructor(private authService: AuthService, private router: Router){}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  usuarios() {
    return this.authService.usuario;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
