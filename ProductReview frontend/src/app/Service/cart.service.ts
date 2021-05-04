import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpserviceService } from './httpservice.service';
import { Observable, Subject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productApiUrl = environment.ProductUrl;
  private baseUrl = environment.BASE_URL;
  private httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};
  // tslint:disable-next-line: variable-name
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  constructor(private http: HttpClient, private httpService: HttpserviceService) { }

  private httpOtions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };

  post( arr: any): Observable<any> {
    console.log(arr, 'custmerdetails');
    return this.httpService.post(environment.CartUrl + environment.addUrl, arr, '');
  }
  addToCart(productId: any): Observable<any> {
    return this.httpService
      .post(`${environment.ProductUrl}/${environment.ADDCART}/${productId}`, {}, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }
  increaseProductsQuantity(productId, CartInfo) {
    console.log('cart details are ', CartInfo);
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.ProductUrl}/${environment.INC_PRODUCTS_QUANTITY}${productId}`, CartInfo , {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }

 decreaseProductsQuantity(productId, CartInfo) {
    console.log('cart details are ', CartInfo);
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.ProductUrl}/${environment.DEC_PRODUCTS_QUANTITY}${productId}`, CartInfo , {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }




  removeIteamFromCart(productId: number) {
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .delete(`${environment.ProductUrl}/${environment.REMOVE_PRODUCTS_FROM_CART}/${productId}`, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }

  getCartProductsFrom() {
    // tslint:disable-next-line: max-line-length
    return this.httpService.get(`${this.baseUrl}/${environment.GET_PRODUCTS_FROM_CART}`, {headers: new HttpHeaders({token: localStorage.token})});
  }

  getCartItemCount(): Observable<any> {
    console.log('get itmes from cart');
    // tslint:disable-next-line: max-line-length
    return this.httpService.get(`${this.baseUrl}/${environment.COUNT_PRODUCTS_IN_CART}`, {headers: new HttpHeaders({token: localStorage.token})});
  }


  addquantity(ProductId: any, quantity: any): Observable<any> {
    return this.httpService.post(environment.quantity + environment.addproductsquantity + '/' + ProductId + '/' + quantity, '', '');  }
}
