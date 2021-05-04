import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpserviceService } from './httpservice.service';
import { ProductModule } from '../Model/product/product.module';
import { tap, map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // tslint:disable-next-line: variable-name
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }


  private searchProductData = new Subject<any>();
  private baseUrl = environment.BASE_URL;
  private notesList = new Subject<any>();
  private getReviewUrl = environment.getReview;

  // tslint:disable-next-line: variable-name

  // tslint:disable-next-line: variable-name
  private httpOtions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' })
  };


  constructor(private http: HttpClient, private httpService: HttpserviceService) { }

  private httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};


  public getAllApprovedProduct(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/approved?order=asc`);
  }
  public getAllApprovedProductByPage(page: number, sortby ?: string, orderBy ?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/approved?page=${page}&order=${orderBy}&sortBy=${sortby}`);
  }

  getallProducts() {
    console.log('getting all products');
    // tslint:disable-next-line: max-line-length
    return this.httpService.get(`${this.baseUrl}/products/`, {headers: new HttpHeaders({token: localStorage.token})});
  }

  addProduct(product: any, imageName: string): Observable<any> {
    return this.httpService
      .post(`${environment.ProductUrl}/${environment.addproducts}/${imageName}`, product, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  deleteProduct(productId: any): Observable<any> {
    return this.httpService
      .delete(`${environment.ProductUrl}/${environment.deleteProduct}/${productId}`, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  updateProduct(productId: any, product: any): Observable<any> {
    return this.httpService
    // tslint:disable-next-line: max-line-length
    .put(`${environment.ProductUrl}/${environment.editProduct}/${productId}`, product, {headers: new HttpHeaders({token: localStorage.token})})
    .pipe(
      tap(() => {
        this._autoRefresh$.next();
      })
    );
  }

  verifyProduct(productId: any, status: any): Observable<any> {
    console.log('url ', `${environment.ProductUrl}/${environment.verifyProduct}/${productId}/${status}`);

    return this.httpService
      // tslint:disable-next-line: max-line-length
      .put(`${environment.ProductUrl}/${environment.verifyProduct}/${productId}/${status}`, ' ', {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  uploadProductImage(productId,  formData): Observable<any> {
    return this.httpService
      // tslint:disable-next-line: max-line-length
      .post(`${environment.ProductUrl}/${environment.addProductImage}/${productId}`, formData, {headers: new HttpHeaders({token: localStorage.token})})
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }
  getBokkByid(Productid: any): Observable<any> {
    console.log('product service callerd', Productid);
    console.log('product url', `${this.baseUrl}/products/getproduct/${Productid}`);
    return this.http.get(`${this.baseUrl}/products/getproduct/${Productid}`,
       {});
  }

  setSearchProductData(message: any) {
    console.log('set service', message);
    return this.searchProductData.next({ products: message });
  }
  getSearchProductData(): Observable<any> {
    console.log('get service');
    return this.searchProductData.asObservable();
  }
  public getRateOfProductById(productId: any): Observable<any> {

    console.log( environment.BASE_URL + '/' + environment.avgrateofproduct + productId);
    return this.http.get(
      environment.BASE_URL + '/' + environment.avgrateofproduct + productId,
      {}
    );
  }

  // public getProductById(productId: any): Observable<any> {
  //   console.log('writring review for productid ', productId);
  //   console.log( environment.BASE_URL + environment.getproductbyIdurl + productId);
  //   return this.http.get(
  //     environment.BASE_URL + environment.getproductbyIdurl + productId,
  //     {}
  //   );
  // }
  public getProductById(productId: any): Observable<any> {
    console.log('writring review for productid ', productId);
    console.log( environment.BASE_URL + environment.getproductbyIdurl + productId);
    return this.http.get(
      environment.BASE_URL + environment.getproductbyIdurl + productId,
      {}
    );
  }
  public ratingandreview(productId: number, data: any , token: any) {
    console.log('ratingandreview service method productId :', productId);
    console.log('ratingandreview service method rate& review dto :', data);
    console.log('token to give rate:', token);
    console.log('url ' + environment.BASE_URL + '/' + environment.WRITE_REVIEW + productId);
    const tokens = token;

    return this.http
      .put(environment.BASE_URL + '/' + environment.WRITE_REVIEW + productId, data, {headers: new HttpHeaders({token})})
      .pipe(
        tap(() => {
          this.searchProductData.next();
        })
      );
  }

  public getratingandreview(productId: number) {
    return this.http.get(environment.BASE_URL + environment.ratereview + productId, this.httpOptions);
  }

  getInProgressOrderedProducts(): Observable<any> {
    console.log('order status url');
    console.log(this.httpService.get(environment.adminUrl + environment.getOrdersByseller, this.httpOptions));
    return this.httpService.get(environment.adminUrl + environment.getOrdersByseller, {});
   }

  public getReview(productId: number) {
    console.log('get review url:', `${environment.BASE_URL}/${this.getReviewUrl}?productId=${productId}`);
    return this.http.get(`${environment.BASE_URL}/${this.getReviewUrl}?productId=${productId}`, this.httpOptions);
  }

  public getSortedProductByRate(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/${environment.getSortedProductByRate}`, this.httpOptions);
  }

  public getOneProduct(productId: number , token: any) {
    return this.http.get(`${this.baseUrl}/products/getproduct/${productId}`,
    {headers: new HttpHeaders({token})});
  }

  public getOneProductById(productId: number) {
    return this.http.get(`${this.baseUrl}/products/getproduct/${productId}`,
    this.httpOptions);
  }


}
