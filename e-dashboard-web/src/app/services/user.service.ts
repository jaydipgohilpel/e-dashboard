import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPayload } from '../interface/user.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpService) { }

  register(payload: UserPayload): Observable<any> {
    return this.http.post(`register`, payload);
  }
}
