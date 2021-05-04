import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Service/token.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';
import {  MatSnackBar } from '@angular/material/snack-bar';

import {  MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from '../../addproduct/addproduct.component';
import { UpdateProductComponent } from '../../update-product/update-product.component';
import { UploadProductImageComponent } from '../../addproduct/upload-product-image/upload-product-image.component';
import {ActivatedRoute,ParamMap} from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  constructor(private service: ProductService , private dialog: MatDialog,
              private matSnackBar: MatSnackBar,private _route:ActivatedRoute

  ) { }
  productSearch: any;
  name: string = null;
  products: any;
  status: string;
  
  sellerProducts:boolean=false;
  orderProducts:boolean=false;

  private param:any;
  
  ngOnInit(): void {
    this.service.autoRefresh$.subscribe(() => {
      this._route.queryParams.subscribe
    (params=>
      {this.param=params['product'];
      if (this.param == "sellerproduct") 
      {
      this.sellerProducts=true;
      this.orderProducts=false

      }
      if(this.param == "order")
      {
        this.sellerProducts=false;
        this.orderProducts=true;
      }
    });
       this.getallProducts();
    });

    this._route.queryParams.subscribe
    (params=>
      {this.param=params['product'];
      if (this.param == "sellerproduct") 
      {
      this.sellerProducts=true;
      this.orderProducts=false

      }
      if(this.param == "order")
      {
        this.sellerProducts=false;
        this.orderProducts=true;
      }
    });

    this.getUserName();
    this.getallProducts();
    this.getSearchProductData();
  }
  
  getallProducts() {
    this.sellerProducts=true;
    this.orderProducts=false;
    console.log('inside seller product meth.....');
    this.service.getallProducts().subscribe( response => {
      this.products = response.obj;
      console.log('All products ', this.products);
    });

  }

  deleteProduct(productId) {
    this.service.deleteProduct(productId).subscribe((message) => {
      if (message.statusCode === 202) {
        this.matSnackBar.open('Product Deleted Successfully', 'OK', {
          duration: 4000,
        });
    } else {
      this.matSnackBar.open('Error in Product Deletion', 'ok', { duration: 4000 });
    }
    });
  }


  openImageDialog(productId): void {
    const dialogRef = this.dialog.open(UploadProductImageComponent, {
      width: '25rem',
      panelClass: 'custom-dialog-container',
      data: { productId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '25rem',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: {
        productName: product.productName,
        authorName: product.authorName,
        price: product.price,
        noOfProducts: product.noOfProducts,
        productDetails: product.productDetails,
        productId: product.productId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddproductComponent, {
      width: '25rem',
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  verifyProduct(productId: any) {
  this.status = 'OnHold';
  this.service.verifyProduct(productId, this.status).subscribe((message) => {
      if (message.statusCode === 202) {
        this.matSnackBar.open('Request sent Successfully', 'OK', {
          duration: 4000,
        });
    } else {
      this.matSnackBar.open('Error in Product Deletion', 'ok', { duration: 4000 });
    }
    });
  }

  getUserName() {
   this.name = localStorage.getItem('Name');
  }

  getSearchProductData() {
    this.service.getSearchProductData().subscribe((message) => {
      console.log('search data', message.products);
      this.productSearch = message.products;
    });
  }

}
