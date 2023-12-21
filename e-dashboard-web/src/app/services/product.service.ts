import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPayload } from '../interface/user.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpService) { }

  addProduct(payload: UserPayload): Observable<any> {
    return this.http.post(`add-product`, payload);
  }

  getProductList(): Observable<any> {
    return this.http.get(`products`);
  }

  deleteProduct(productId: String): Observable<any> {
    return this.http.delete(`product/${productId}`);
  }
}
