import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPayload } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }

  register(payload: UserPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  // getPosts(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/posts`);
  // }

  // getPostById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  // }



  // updatePost(id: number, post: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post);
  // }

  // deletePost(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/posts/${id}`);
  // }
}
