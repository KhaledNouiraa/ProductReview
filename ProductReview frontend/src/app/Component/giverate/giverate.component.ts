import { Component, OnInit, Input } from '@angular/core';
import { ProductModule } from 'src/app/Model/product/product.module';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-giverate',
  templateUrl: './giverate.component.html',
  styleUrls: ['./giverate.component.scss']
})
export class GiverateComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  // tslint:disable-next-line: no-input-rename
  @Input('starCount')  starCount = 5;
  color: string;
  private snackBarDuration = 2000;
  ratingArr = [];
  rating: number;
  product: ProductModule;
  productId: any;
  review: any;
  totalRate: any;

  productImage: any;
  productName: any;
  productAuthor: any;
  token: any;

  ngOnInit(): void {
    this.productService.autoRefresh$.subscribe(() => {
      this.getRateOfProduct(this.productId);
    });
    this.productId = this.route.snapshot.paramMap.get('productId');
    console.log('productId:', this.productId);
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('token:', this.token);
    this.getProductById();
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.getRateOfProduct(this.productId);
    this.getColor();
  }


  onClick(rating: any) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration,
    });
    this.rating = rating;
    return false;
  }

    showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  getProductById() {
    console.log('get product called');
    this.productService.getOneProduct(this.productId , this.token).subscribe((response: any) => {
      if (response.obj != null) {
        this.product = response.obj;
        this.productImage = response.obj.image;
        this.productAuthor = response.obj.authorName;
        this.productName = response.obj.productName;
      }
    });
  }

  submitRate() {
    const data = {
      rating: this.rating,
      review: this.review,
    };
    console.log('rating is', data.rating);
    console.log('review is ', data.review);
    this.productService
      .ratingandreview(this.productId, data , this.token)
      .subscribe((response: any) => {
        console.log('submit rate response:', response);
        this.snackBar.open(response.response, 'ok', { duration: 2000 });
        this.router.navigateByUrl('products');
      },
      (error: any) => {
        this.snackBar.open(error.error.message, 'ok', { duration: 2000 });
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

  getRateOfProduct(productId: number)  {
    console.log('product id for avgrate:', productId);
    this.productService.getRateOfProductById(productId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of products:', response.obj);
        this.totalRate = response.obj;

        }

    );

  }

}
