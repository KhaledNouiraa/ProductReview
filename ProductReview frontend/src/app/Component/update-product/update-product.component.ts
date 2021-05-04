import { Component, OnInit , Inject} from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/Service/product.service';
import { ProductModule } from 'src/app/Model/product/product.module';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productName = new FormControl(this.data.productName, [Validators.required]);
  authorName = new FormControl(this.data.authorName, [Validators.required]);
  price = new FormControl(this.data.price, [Validators.required]);
  noOfProducts = new FormControl(this.data.noOfProducts, [Validators.required]);
  productDetails = new FormControl(this.data.productDetails, [Validators.required, ]);
  private imageFile: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private productservice: ProductService,
               private activedRoute: ActivatedRoute,
               private router: Router,
               private matSnackBar: MatSnackBar,
               private http: HttpClient,
               public dialogRef: MatDialogRef<UpdateProductComponent>, ) { }
  updateproduct: ProductModule = new ProductModule();
  ngOnInit(): void {
  }

  onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }
  updateProduct() {

    this.updateproduct.productName = this.data.productName;
    this.updateproduct.authorName = this.data.authorName;
    this.updateproduct.price = this.data.price;
    this.updateproduct.noOfProducts = this.data.noOfProducts;
    this.updateproduct.productDetails = this.data.productDetails;
    // this.dialogRef.close();

    setTimeout(() => {
      this.productservice.updateProduct(this.data.productId, this.updateproduct).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.dialogRef.close({ data: this.updateproduct });
            this.matSnackBar.open(response.response, 'undo', {
              duration: 3000,
            });
          } else {
            this.dialogRef.close();
            this.matSnackBar.open('Product not updated...try again', 'undo', {
              duration: 2500,
            });
          }
        },
        (error: any) => {
          this.dialogRef.close();
          this.matSnackBar.open('something went wrong.....!', 'undo', {
            duration: 2500,
          });
        }
      );
    }, 3000); // spinner
  }
}
