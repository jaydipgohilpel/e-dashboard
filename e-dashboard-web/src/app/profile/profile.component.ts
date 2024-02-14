import { Component } from '@angular/core';
import { UserPayload } from '../interface/user.interface';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user!: UserPayload;
  ngOnInit() {
    let token = JSON.parse(localStorage.getItem('user') || '');
    if (token) {
      this.user = jwtDecode(token);
    }
  }
}
