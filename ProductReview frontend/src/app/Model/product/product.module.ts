import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule {
  [x: string]: any;

  productId: number;
  ProductModule: string;
  productDetails: string;
  authorName: string;
  productName: string;
  price: number;
  noOfProducts: number;
  image: string;
  createdDateAndTime: Date;
  status: string;
 }
