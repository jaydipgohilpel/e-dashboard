import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) { }
  isLogin: boolean = true

  ngOnInit() {
    this.authService.isAuthentic$.subscribe(auth => {
      this.isLogin = auth;
    })
    localStorage.getItem('token') ?
      this.isLogin = true
      : this.isLogin = false;
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/log-in']);
    this.authService.setIsAuthentic(false);
  }
}
