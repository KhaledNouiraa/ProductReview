import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import {   MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/Service/product.service';
import { ProductModule } from 'src/app/Model/product/product.module';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup;
  productid;
  constructor( private matSnackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private productService: ProductService,
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<AddproductComponent>) { }
    private imageFile: string;
  ngOnInit(): void {}

  addproducts: ProductModule = new ProductModule();
  productName = new FormControl(this.addproducts.productName, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  authorName = new FormControl(this.addproducts.authorName, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  price = new FormControl(this.addproducts.price, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9 ]*"),
  ]);
  noOfProducts = new FormControl(this.addproducts.noOfProducts, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9]*"),
  ]);
  productDetails = new FormControl(this.addproducts.productDetails, [
    Validators.required,
    Validators.minLength(20),
    Validators.pattern("[a-zA-Z ]*"),
  ]);


  onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }
    onClickaddProduct() {
      this.productService.addProduct(this.addproducts, this.imageFile).subscribe(
        (user) => {
          if (user.statusCode === 200) {
            this.matSnackBar.open(user.response, 'ok', {duration: 4000});
            this.dialogRef.close(1);
          }
        },
        (error: any) => {
          this.matSnackBar.open(error.error, 'ok', { duration: 4000 });
          console.log(error);
        }
      );
      if (this.productForm.invalid) {
        return;
      }
    }
    
    productNameValidation() {
      return this.productName.hasError("required") ? "Product Name must be required" : 
             this.productName.hasError("minlength") ? "Minimum 3 character must be present" : 
             this.productName.hasError("maxlength") ? "Maximum 25 character allowed" : "";
    }
    productAuthorValidation() {
      return this.authorName.hasError("required") ? "Author name must be required" : 
             this.authorName.hasError("minlength") ? "Minimum 5 character must be present" : 
             this.authorName.hasError("maxlength") ? "Maximum 25 character allowed" : "";
    }
    productPriceValidation() {
      return this.price.hasError("required") ? "Price must be required" :
             this.price.hasError('pattern')? "Only numbers allowed":
             this.price.hasError("minlength") ? "Minimum 1 digit must be there" :"";
    }
    noOfProductsValidation() {
      return this.noOfProducts.hasError("required") ? "Total Number of must be required" : 
             this.noOfProducts.hasError('pattern')? "Only numbers allowed":
             this.noOfProducts.hasError("minlength") ? "Minimum 1 digit must be there" :"";
    }
    productDescriptionValidation() {
      return this.productDetails.hasError("required") ? "Product Description must required" :
             this.productDetails.hasError("minlength") ? "Minimum 20 characters  must be there" :"";
    }
   
}
