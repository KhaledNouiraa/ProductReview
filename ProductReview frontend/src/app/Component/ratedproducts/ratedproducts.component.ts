import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { ProductModule } from 'src/app/Model/product/product.module';
import {  MatDialog } from '@angular/material/dialog';
import { ProductreviewsComponent } from '../productreviews/productreviews.component';


@Component({
  selector: 'app-ratedproducts',
  templateUrl: './ratedproducts.component.html',
  styleUrls: ['./ratedproducts.component.scss']
})
export class RatedproductsComponent implements OnInit {

  productList = Array<any>();
  totalRate: any;
  color: string;
  avgRate: any;
  productId: any;
  rateList = Array<any>();
  productSearch: any;

  constructor(private service: ProductService,
              private matSnackBar: MatSnackBar, private dialog: MatDialog
    ) { }


  ngOnInit(): void {
    // this.getallApprovedProducts();
    this.getProductByRating();
    this.totalRate = 0;

    this.getColor();
    this.getSearchProductData();

  }

  getProductByRating() {
    this.service.getSortedProductByRate().subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('products:', response.obj);
        this.productList = response.obj;


        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );

  }

 getRateOfProduct(productId: number)  {
    console.log('product id for avgrate:', productId);
    this.service.getRateOfProductById(productId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of products:', response.obj);
        this.totalRate = response.obj;

        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );

  }

  getallApprovedProducts() {
    console.log('method called');
    this.service.getallProducts().subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('products:', response.obj);
        this.productList = response.obj;


        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }

  getColor() {
    if (this.totalRate >= 3 || this.totalRate >= 2) {
      this.color = 'rgb(245,182,110)';
    }
    if (this.totalRate >= 4) {
      this.color = 'rgb(16,136,16)';
    }
    if (this.totalRate < 2) {
      this.color = 'rgb(250,0,0)';
    }
  }

  getReviews(product) {
    const dialogRef = this.dialog.open(ProductreviewsComponent, {
      // width: '25rem',
      // panelClass: 'custom-dialog-container',
      // height: '400px',
      // width: '600px',
      data : {productId: product.productId}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getSearchProductData() {
    this.service.getSearchProductData().subscribe((message) => {
      console.log('search data', message.products);
      this.productSearch = message.products;
    });
  }
}
