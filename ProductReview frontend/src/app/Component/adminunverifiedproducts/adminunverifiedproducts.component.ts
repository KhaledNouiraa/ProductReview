import { Component, OnInit } from '@angular/core';
import { ProductModule } from 'src/app/Model/product/product.module';
import { AdminService } from 'src/app/Service/admin.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminunverifiedproducts',
  templateUrl: './adminunverifiedproducts.component.html',
  styleUrls: ['./adminunverifiedproducts.component.scss']
})
export class AdminunverifiedproductsComponent implements OnInit {

  constructor(private adminService: AdminService , private snakbar: MatSnackBar) { }

  product = [];
  products = new Array<ProductModule>();
  noteId = 1;
  status: string;

  ngOnInit(): void {

    this.getUnApprovedProducts(status);

    // this.dataSource.paginator = this.paginator;
    console.log('products ', this.products);
    this.adminService.autoRefresh.subscribe(() => {
      this.getUnApprovedProducts(status);
    });
  }


  getUnApprovedProducts(status: string) {
    console.log('method called');
    this.adminService.getUnverifiedProducts('OnHold').subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('products:', response.obj);
        this.products = response.obj;
        },
      (error: any) => {
        this.snakbar.open(error.error.message, 'failed', {duration: 5000});
      }
    );


  }

  approveProducts(productId: number, status: string) {
    console.log('productId from approve button:', productId);
    this.adminService.approveProducts(productId, status).subscribe(

      (response: any) => {
        console.log('response', response);
        this.snakbar.open('product is approved', 'success', {duration: 4000});

        },
      (error: any) => {
        this.snakbar.open(error.error.message, 'failed', {duration: 5000});
      }
    );


  }

rejectProducts(productId: number, status: string) {
  console.log('productId from reject button:', productId);
  this.adminService.rejectProducts(productId, status).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('notes:', response.obj);
        this.snakbar.open('product is rejected', 'success', {duration: 4000});

        },
      (error: any) => {
        this.snakbar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
}
}
