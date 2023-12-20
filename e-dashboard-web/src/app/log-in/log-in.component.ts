import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router, private NotificationService: NotificationService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/products']);
      this.authService.setIsAuthentic(true);
    }
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return
    this.userService.login(this.loginForm.value).subscribe(user => {
      if (user.error)
        this.NotificationService.showError(user.error);
      if (!user.token) return;
      localStorage.setItem('token', JSON.stringify(user.token));
      this.authService.setIsAuthentic(true);
      this.initForm();
      this.router.navigate(['/products']);
    })
  }
}
