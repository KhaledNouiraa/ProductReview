import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Service/product.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-productreviews',
  templateUrl: './productreviews.component.html',
  styleUrls: ['./productreviews.component.scss']
})
export class ProductreviewsComponent implements OnInit {

  productId:number;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any,private productService: ProductService , private snakbar: MatSnackBar) { 
    this.productId = data.productId;
    console.log("productid for review:",this.productId);
  }

  ngOnInit(): void {
    this.getReviews();
  }
  reviews = new Array<any>();
  reviewList =new Array<any>();
  rev:string;
  user=new Array<any>();
  color: string;
  totalRate:any;

  getReviews()
  {
    this.getRateOfProduct(this.productId);
this.productService.getReview(this.productId).subscribe((response: any) => {

  console.log("Review response:",response.obj);
  this.reviews=response.obj;
  console.log("Reviews stored:",response.obj['review']);
  for (var index in this.reviews) {
    this.rev = this.reviews[index].review;
    this.user = this.reviews[index].userName;

    console.log("user:",this.user);
   
    var p={name:this.user,review:this.rev,rating:this.reviews[index].rating};
    this.reviewList.push(p);
    console.log("after push:",this.reviewList);
  
  }

}
);
  }

  getRateOfProduct(productId:number)  {
    console.log("product id for avgrate:",productId);
    this.productService.getRateOfProductById(productId).subscribe(

      (response: any) => {
        console.log('response', response);
        console.log('rate of products:', response.obj);
        this.totalRate= response.obj;
        
        }
     
    );
   
  }


  // reviewList=
  //   [
  //     { 
  //       name: "Nayan", review: "This product is a Norse Arabian Nights. Each section is a honeycomb. Stories are nested in stories and crack open to reveal rumor and anecdote, prose poems, tendrils of myth" 
  //     },
  //     { 
  //       name: "Jhon", review: "The opening story’s incessant hedging about language—meant, in part, to parody, ad nauseam, the almost paranoiac way that our language about identity tends to be policed" 
  //     },
  //     { 
  //       name: "michael", review: "The product—though an absorbing and well-crafted work of fiction capable of standing on its own, without the support of biography—is almost impossible to consider independently of the knowledge of where its author’s life overlaps with his art" 
  //     },
  //   ]

}
