import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpserviceService } from './httpservice.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private httpService: HttpserviceService) { }

  private adminUrl = environment.adminUrl;
  private approveProduct = environment.approveProduct;
  private rejectProduct = environment.rejectProduct;
  private unVerifiedProducts = environment.unVerifiedProducts;
  private rejectedProducts = environment.rejectedProducts;
  private approvedProducts = environment.approvedProducts;

  private token = localStorage.getItem('token');

  private getallOrderedProducts = environment.getallOrderedProducts;
  private changeOrderstatus = environment.changeOrderstatus;
  // tslint:disable-next-line: variable-name
  private _autoRefresh$ = new Subject();

  get autoRefresh$() {
    return this._autoRefresh$;
  }

  // private token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6M30.rzol7EjZW2exz-O-d40T3FvIem3Lk8kYGTngic_YHHX2_T7c4zMCcjDfzMXtOHehZkP8cW7TDK_tWELwWkkryQ";





  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  private httpOptions = {
    headers: new HttpHeaders ({'content-type': 'application/json' , token: this.token})
    };

    getUnverifiedProducts(status: string) {
      // status='Onhold';
      console.log('unverified products ' + this.adminUrl + this.unVerifiedProducts + '?status=' + status);
      return this.httpService.get(this.adminUrl + this.unVerifiedProducts + '?status=' + status, this.httpOptions);
    }

    getRejectedProducts() {

      return this.httpService.get(this.adminUrl + this.rejectedProducts, this.httpOptions);
    }

    getApprovedProducts(status: string) {

      return this.httpService.get(this.adminUrl + this.approvedProducts + '?status=' + status, this.httpOptions);
    }

    approveProducts(noteId: number, status: string): Observable<any> {

      // tslint:disable-next-line: max-line-length
      return this.httpService.put(this.adminUrl + this.approveProduct + noteId + '?' + 'status=' + status, '', this.httpOptions).pipe(tap(() => { this.subject.next(); }));
    }

    rejectProducts(noteId: number, status: string): Observable<any> {

      // tslint:disable-next-line: max-line-length
      return this.httpService.put(this.adminUrl + this.rejectProduct + noteId + '?' + 'status=' + status, '', this.httpOptions).pipe(tap(() => { this.subject.next(); }));
    }

    getAllOrderedProducts(): Observable<any> {
      console.log('order status url');
      console.log(this.httpService.get(this.adminUrl + this.getallOrderedProducts, this.httpOptions));
      return this.httpService.get(this.adminUrl + this.getallOrderedProducts, {});
     }



     updateOrderStatus(orderId: any, status: any): Observable<any> {
      //  var y:number =+orderId;
       console.log('url ' + this.adminUrl + this.changeOrderstatus + '?orderId=' + orderId + '&status=' + status);


      // return this.httpService.put(this.adminUrl+this.changeOrderstatus+"?orderId="+orderId+"&status="+status,"",this.httpOptions);

       return this.httpService
                             // tslint:disable-next-line: max-line-length
                             .put(this.adminUrl + this.changeOrderstatus + '?orderId=' + orderId + '&status=' + status, '', this.httpOptions);
                            //  .pipe(
                            //   tap(() => {
                            //     this._autoRefresh$.next();
                            //   })
                            // );

      // http://localhost:8080/productstore/orderStatusByAdmin?orderId=583785&status=in%20progress
     }
  //    @GetMapping(value = "productstore/orderedproducts/{token}")
 // public ResponseEntity<Response> getOrderlist(@PathVariable("token") String token) throws Exception {

  }
