import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Valid?', this.myForm.valid); // true or false
    console.log('Name', this.myForm.value.name);
    console.log('Email', this.myForm.value.email);
    console.log('password', this.myForm.value.password);

    if (this.myForm.invalid) return
    this.userService.register(this.myForm.value).subscribe(user => {
      if (!user.data) return
      localStorage.setItem('user', JSON.stringify(user.data));
      this.initForm()
      this.router.navigate(['/products']);
    })
  }
}
