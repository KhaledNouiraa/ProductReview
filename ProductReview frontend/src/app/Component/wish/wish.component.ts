import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/Service/wishlist.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {

  constructor( private cartService: CartService, private wishlistService: WishlistService , private route: Router,
               private matSnackBar: MatSnackBar) { }

  // tslint:disable-next-line: variable-name
  product_id: number;
  error: any;
  products = [];
  WishListdetails = new Array<any>();

  countproduct: number;

  productcount: number;
  no: number;
  ngOnInit(): void {
    this.productsFromWishList();
    this.ProductCount();
  }

  productsFromWishList() {
    this.wishlistService.getWishllistProducts().subscribe((Response) => {
      console.log('no of products in array ' + Response.obj.length);
      this.countproduct = Response.obj.length;
      console.log('wishlist products' , Response.obj);
      console.log('---response', Response);
      this.products = Response.obj;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < Response.obj.length; i++) {

      console.log('productName : ' +  Response.obj[0].productsList[0].productName);
      console.log('productDetails : ' +  Response.obj[0].productsList[0].productDetails);
      console.log('authorName : ' +  Response.obj[0].productsList[0].authorName);
      console.log('noOfProducts : ' +  Response.obj[0].productsList[0].noOfProducts);
      console.log('image : ' +  Response.obj[0].productsList[0].image);
      console.log('price : ' +  Response.obj[0].productsList[0].price);
      console.log('productId : ' +  Response.obj[0].productsList[0].productId);

      console.log('products are ' + this.products);

      const p = {productName: Response.obj[i].productsList[0].productName , productDetails: Response.obj[i].productDetails,
         authorName: Response.obj[i].productsList[0].authorName,
        noOfProducts: Response.obj[i].productsList[0].noOfProducts,
        image: Response.obj[i].productsList[0].image,  price: Response.obj[i].productsList[0].price ,
        productId: Response.obj[i].productsList[0].productId
      };

      this.WishListdetails.push(p);
      console.log('after push ', this.WishListdetails);
    }

     });

  }
  ProductCount() {
    this.wishlistService.getWishlistCount().subscribe(
      (Response: any) => {
        console.log('product count = ' + Response.obj);
        this.productcount = Response.obj;
        this.matSnackBar.open(Response.message, 'undo', { duration: 2500 });
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.matSnackBar.open(error.error.message, 'undo', { duration: 2500 });
      }
    );
  }

  remoiveFromWish(ProductId: any) {
    console.log('removeing productId ' + ProductId);

    this.wishlistService.removeFromWishList(ProductId).subscribe(
      (response: any) => {

        this.matSnackBar.open('Product removed from wish list', 'success', {duration: 5000});
        window.location.reload();
        sessionStorage.removeItem(ProductId);
        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }

  addToWish(orderId: any) {
    console.log('removeing productId ' + orderId);

    this.wishlistService.addToWishlist(orderId).subscribe(
      (response: any) => {
        this.matSnackBar.open('Product removed from wish list', 'success', {duration: 5000});

        },
      (error: any) => {
        this.matSnackBar.open(error.error.message, 'failed', {duration: 5000});
      }
    );
  }


  addtobag( productId: any) {
    if (localStorage.getItem('token') === null) {
      this.matSnackBar.open('Please Login first', 'ok', {
        duration: 5000
      });
      sessionStorage.setItem(productId, productId);
      this.route.navigateByUrl('login');
    }

    sessionStorage.setItem(productId, productId);

    this.cartService.addToCart(productId).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data: any) {
    console.log(data);
    window.location.reload();
    this.matSnackBar.open('Product added successfully Into Cart' , 'ok', {
    duration: 5000
  });
}

handleError(error: any) {
  this.error = error.error.message;
  console.log(error);
  window.location.reload();
  this.matSnackBar.open(this.error, 'ok', {
  duration: 5000
});
}
}
