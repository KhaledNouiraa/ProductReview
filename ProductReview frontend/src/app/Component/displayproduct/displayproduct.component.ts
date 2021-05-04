import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { ProductModule } from 'src/app/Model/product/product.module';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { WishlistService } from 'src/app/Service/wishlist.service';
@Component({
  selector: 'app-displayproduct',
  templateUrl: './displayproduct.component.html',
  styleUrls: ['./displayproduct.component.scss']
})
export class DisplayproductComponent implements OnInit {
  productSearch: any;
  selectedValue = 'relevance';
  orderBy = 'asc';
  boo: any;
  error = null;
  productList = Array<any>();
  product: ProductModule = new ProductModule();
  items = [];
  pageofItems: Array<ProductModule> = new Array<ProductModule>();
  obj: ProductModule[];
  size: number;
  // tslint:disable-next-line: variable-name
  product_id: number;
  productName: string;
  page = 0;
  length: any = sessionStorage.length;
  pageEvent: PageEvent;
  lengths = 0;
  CurrentPageNo: 0;
  totalPage: Array<number>;

  s: any; selectoption: any;
  value: any = [];
  @Output() output: EventEmitter<any> = new EventEmitter();
  leng: any;
  constructor( private service: ProductService,
               private matSnackBar: MatSnackBar,
               private route: Router,
               private cartService: CartService,
               private wishlistService: WishlistService) { }

  ngOnInit() {
    this.getallApprovedProducts();
    this.getSearchProductData();
    this.leng = sessionStorage.length;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
      console.log('key ::' + key);
    }
    console.log(this.value);
  }

  onChange(deviceValue) {
    this.selectedValue = deviceValue;
    console.log(' this is tha value of drope down ' + deviceValue);
    switch (this.selectedValue) {
      case 'mod1':
         console.log('vikash kumar1');
         this.approvedProductServiceMethod(this.page, 'price', 'des');
         console.log('Products are from 1  ', this.productList);
         break;
      case 'mod2':
        this.approvedProductServiceMethod(this.page, 'price', 'asc');
        console.log('Products are from 2  ', this.productList);
        break;
      case 'mod3':
        this.approvedProductServiceMethod(this.page, 'created_date_and_time', 'asc');
        console.log('Products are from 3  ', this.productList);
        break;
    }
}

  getallApprovedProducts() {
    this.approvedProductServiceMethod(this.page, 'product_id', 'asc');
  }

  approvedProductServiceMethod(page ?: number, order?: string, sortby?: string) {
    this.service.getAllApprovedProductByPage(page, order, sortby).subscribe((response: any) => {
      console.log(response);
      console.log('Products are the' + response.obj);
      this.productList = response.obj.content;
      this.size = response.obj.totalElements;
      this.CurrentPageNo = response.obj.pageable.pageNumber;
      this.totalPage = new Array(response.obj.totalPages);
      console.log('Total pages is: ' + this.totalPage);
      console.log('total products are ' + this.size);
      console.log('curret page number is ' + this.CurrentPageNo);
      console.log('Products are  ', this.productList.length);
    });
  }
getSearchProductData() {
    this.service.getSearchProductData().subscribe((message) => {
      console.log('search data', message.products);
      this.productSearch = message.products;
    });
  }


  SetPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    console.log('page number you want is' + i);
    this.getallApprovedProducts();
  }

   previos(event: any) {
    event.preventDefault();
    this.page = this.page - 1;
    console.log('current page from previous' + 'next' + this.page);
    this.getallApprovedProducts();
   }

   next(event: any) {
    event.preventDefault();
    this.page = this.page + 1;
    console.log('current page from next ' + 'next' + this.page);
    this.getallApprovedProducts();
   }

  addtobag( productId: any) {
  if (localStorage.getItem('token') === null) {
    this.matSnackBar.open('Please Login first', 'ok', {
      duration: 5000
    });
    this.route.navigateByUrl('login');
    return;
  }
  sessionStorage.setItem(productId, productId);
  this.ngOnInit();
  this.cartService.addToCart(productId).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
}

  handleResponse(data: any) {
    console.log(data);
    this.matSnackBar.open('Product added successfully Into Cart' , 'ok', {
    duration: 5000
  });
}
handleWishResponse(wishdata: any) {
  console.log(wishdata);
  this.matSnackBar.open('Product is added successfully to wishlist' , 'ok', {
  duration: 5000
});
}


  handleError(error: any) {
    this.error = error.error.message;
    console.log(error);
    this.matSnackBar.open(this.error, 'ok', {
    duration: 5000
  });
  }
  getOutput() {
  }
  Deatails(productId) {
    console.log('Redirected to page no ' + productId);
    this.route.navigateByUrl('products/info/' + productId);

  }
  getUpdatedNotes(event) {
    this.ngOnInit();
    }

    addtoWish( productId: any) {
      if (localStorage.getItem('token') === null) {
        this.matSnackBar.open('Please Login first', 'ok', {
          duration: 5000
        });
        this.route.navigateByUrl('login');
      }
      this.wishlistService.addToWishlist(productId).subscribe(
        wishdata => this.handleWishResponse(wishdata),
        error => this.handleError(error)
      );
    }
}
