import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Service/token.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';
import {  MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import {  MatDialog } from '@angular/material/dialog';
import { ProductModule } from 'src/app/Model/product/product.module';
import { Order} from 'src/app/Model/order.model';
import { AdminService } from 'src/app/Service/admin.service';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {

  constructor(private service: ProductService ,private adminservice:AdminService ,private dialog: MatDialog,
    private matSnackBar: MatSnackBar,private sellerService:ProductService

) { }
productSearch: any;
name: string = null;
products: any;
status: string;
orderedProducts: any;
orderdetails = new Array<any>();

animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  
  selectedValue: string;
 
role:string;
isAdmin:boolean=false;
isSeller:boolean=false;
ngOnInit(): void {

  this.role = localStorage.getItem('role');
  if(this.role==='admin'){
    this.isAdmin=true;
    this.isSeller=false;
    this.getallUserOrderedProducts();
  }
  else if(this.role==='seller'){
    this.isAdmin=false;
    this.isSeller=true;
    this.getallUserOrderedProducts();
  }

  this.adminservice.autoRefresh$.subscribe(() => {
    if(this.role==='admin'){
      this.getallUserOrderedProducts();
    }
    else if(this.role==='seller'){
      this.getallUserOrderedProducts();
    }
 });
  
}


getallUserOrderedProducts() {
  console.log('order status api called');
  this.adminservice.getAllOrderedProducts().subscribe( response => {
  this.orderedProducts = response.obj;
  console.log('All orderproducts for order status= :  ', this.orderedProducts);
  console.log("no of orders "+response.obj.length);

  for (let i = 0; i < response.obj.length; i++) {
    console.log ("Block statement execution no." + i);
    console.log("orderId : "+response.obj[i].orderId);
    console.log("orderStatus : "+response.obj[i].orderStatus);
    console.log("productName : "+response.obj[i].productsList[0].productName);
    console.log("productDetails : "+response.obj[i].productsList[0].productDetails);
    console.log("authorName : "+response.obj[i].productsList[0].authorName);
    console.log("image : "+response.obj[i].productsList[0].image);
    console.log("productprice : "+response.obj[i].productsList[0].price);
    console.log("totalprice : "+response.obj[i].quantityOfProducts[0].totalprice);
    console.log("quantityOfProduct : "+response.obj[i].quantityOfProducts[0].quantityOfProduct);


    var p = {orderId:response.obj[i].orderId, orderStatus:response.obj[i].orderStatus, productName:response.obj[i].productsList[0].productName,
      productDetails:response.obj[i].productsList[0].productDetails, authorName:response.obj[i].productsList[0].authorName,
      image:response.obj[i].productsList[0].image,  totalprice:response.obj[i].quantityOfProducts[0].totalprice,
      quantityOfProduct:response.obj[i].quantityOfProducts[0].quantityOfProduct
    };

      this.orderdetails.push(p);
      console.log("after push ",this.orderdetails);
  }  
  });
}

no:any;

updateOrderAdmin(orderId:any,status:any) {
  console.log('Order Id',orderId);
  console.log('Order status',status);  
  this.adminservice.updateOrderStatus(orderId,status).subscribe(
    (response: any) => {
      this.matSnackBar.open("Order updated by Admin", 'success', {duration: 5000});
      
      },
    (error: any) => {
      this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
    }
  );
}

updateOrderSeller(orderId:any,status:any) {
  console.log('Order Id',orderId);
  console.log('Order status',status);  
  this.adminservice.updateOrderStatus(orderId,status).subscribe(
    (response: any) => {
      this.matSnackBar.open("Order updated by Seller", 'success', {duration: 5000});
      
      },
    (error: any) => {
      this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
    }
  );
}

// getInProgressOrderedProducts() {
//   console.log('Get in progress order products -------------');
//   this.sellerService.getInProgressOrderedProducts().subscribe( response => {
//   this.orderedProducts = response.obj;
//   console.log('In progress orderproducts for order status= :  ', this.orderedProducts);
//   console.log("no of orders "+response.obj.length);

//   for (let i = 0; i < response.obj.length; i++) {
//     console.log ("Block statement execution no." + i);
//     console.log("orderId : "+response.obj[i].orderId);
//     console.log("orderStatus : "+response.obj[i].orderStatus);
//     console.log("productName : "+response.obj[i].productsList[0].productName);
//     console.log("productDetails : "+response.obj[i].productsList[0].productDetails);
//     console.log("authorName : "+response.obj[i].productsList[0].authorName);
//     console.log("image : "+response.obj[i].productsList[0].image);
//     console.log("productprice : "+response.obj[i].productsList[0].price);
//     console.log("totalprice : "+response.obj[i].quantityOfProducts[0].totalprice);
//     console.log("quantityOfProduct : "+response.obj[i].quantityOfProducts[0].quantityOfProduct);


//     var p = {orderId:response.obj[i].orderId, orderStatus:response.obj[i].orderStatus, productName:response.obj[i].productsList[0].productName,
//       productDetails:response.obj[i].productsList[0].productDetails, authorName:response.obj[i].productsList[0].authorName,
//       image:response.obj[i].productsList[0].image,  totalprice:response.obj[i].quantityOfProducts[0].totalprice,
//       quantityOfProduct:response.obj[i].quantityOfProducts[0].quantityOfProduct
//     };

//       this.orderdetails.push(p);
//       console.log("after in progress order push ",this.orderdetails);
//   }  
//   });
// }
  
}
