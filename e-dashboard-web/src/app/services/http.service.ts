import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`);
  }

  post(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    } | undefined
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, body, options);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${url}`, body);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // getPostById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  // }

  // updatePost(id: number, post: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post);
  // }
}
