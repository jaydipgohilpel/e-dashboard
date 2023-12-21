import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router, private NotificationService: NotificationService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/products']);
      this.authService.setIsAuthentic(true);
    }
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return
    this.userService.register(this.registerForm.value).subscribe(user => {
      if (user.error)
        this.NotificationService.showError(user.error);
      if (!user.data) return;
      this.NotificationService.showSuccess('Registration Successfully!');
      this.initForm();
    })
  }
}
