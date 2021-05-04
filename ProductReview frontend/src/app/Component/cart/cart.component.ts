import { OrderService } from './../../Service/order.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/Service/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProductModule } from 'src/app/Model/product/product.module';
import { CartService } from 'src/app/Service/cart.service';
import { Customer } from 'src/app/Model/customer.model';
import { Address } from 'src/app/Model/address.model';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor( private matSnackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private route: Router,
               private service: ProductService,
               private cartService: CartService,
               private userService: UserService,
               private orderService: OrderService) { }
  selected = false;
  isLinear = false;
  customerForm: FormGroup;
  error: null;
  product = [];
  products: ProductModule = new ProductModule();
  public isLoading = false;
  items = [];
  size: number;
  valueChanged = false;
  // tslint:disable-next-line: variable-name
  product_id: number;
  productSearch: any;
  productName: string;
  length: any = sessionStorage.length;
  si: any = sessionStorage.length;
  value: any = [];
  UserId: number;
  objecrtArry: any = [];
  quantity = 1;
  customer: Customer = new Customer();
  userAdreessDetails: Address = new Address();
  type = 'home';
  bid: any;
  user: number;
  num = 2;
  selectedtype: any;
  adressId: any;
  @Output() output: EventEmitter<any> = new EventEmitter();
select = false;
addre: Address = new Address();
    phoneNumber = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,10}')]);
    Name = new FormControl('', [Validators.required]);
    pincode = new FormControl('', [Validators.required]);
    address = new FormControl('', [Validators.required]);
    locality = new FormControl('', [Validators.required]);
    city = new FormControl('', [Validators.required]);
    landmark = new FormControl('', [Validators.required]);
    Home = new FormControl('', [Validators.required]);
    Work = new FormControl('', [Validators.required]);
    Other = new FormControl('', [Validators.required]);
    productQuantityDetails = {
      eachPrice: null,
      quantityId: null,
      quantityOfProduct : null
    };

  ngOnInit()  {
   this.getsession();
   this.cartService.autoRefresh$.subscribe(() => {
    this.getCartItemCount();
    this. productsFromCart();
  });
   this.fun(this.type);
   this.getCartItemCount();
   this. productsFromCart();
  }

  getCartItemCount() {
    this.cartService.getCartItemCount().subscribe((response: any) => {
      this.length = response.obj;
      console.log('total number of itemes are' + response.obj);
     });
  }

  productsFromCart() {
      this.cartService.getCartProductsFrom().subscribe((Response) => {
        console.log('response of cart products' , Response.obj);
        console.log('products are ', this.product);
        this.product = Response.obj;
        console.log('response from cat', Response.obj[0].quantityOfProduct[0].quantityOfProduct);
        for (const i of this.product) {
          console.log('vikash', i.quantityOfProduct[0].quantityOfProduct);
          this.quantity = i.quantityOfProduct[0].quantityOfProduct;
        }
    });
  }
  increaseQuantity(productId: any , quantityDeatils: any) {
    console.log('increasing items ');
    console.log('Quatity Details', quantityDeatils);
    this.productQuantityDetails.quantityId = quantityDeatils.quantity_id;
    this.productQuantityDetails.eachPrice = quantityDeatils.totalprice / quantityDeatils.quantityOfProduct;
    this.productQuantityDetails.quantityOfProduct = quantityDeatils.quantityOfProduct;
    this.cartService.increaseProductsQuantity(productId, this.productQuantityDetails).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error));
    console.log('Product id' + productId);
    }
  DecreseQuantity(productId: any , quantityDeatils: any) {
    console.log('increasing items ');
    console.log('Quatity Details', quantityDeatils);
    this.productQuantityDetails.quantityId = quantityDeatils.quantity_id;
    this.productQuantityDetails.eachPrice = quantityDeatils.totalprice / quantityDeatils.quantityOfProduct;
    this.productQuantityDetails.quantityOfProduct = quantityDeatils.quantityOfProduct;
    this.cartService.decreaseProductsQuantity(productId, this.productQuantityDetails).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    console.log('Product id' + productId);
  }

  Removecart(key) {
    this.cartService.removeIteamFromCart(key).subscribe((Response) => {
      console.log('removing product', Response);
    });
    sessionStorage.removeItem(key);
    console.log('removinf product id is: ', key);
  }


  handleResponse(data: any): void {
    this.isLoading = false;
    console.log(data);
    this.matSnackBar.open(data.message , 'ok', {
    duration: 5000
  });
  }

  handleError(error: any) {
    this.isLoading = false;
    this.error = error.error.message;
    console.log(error);
    console.log('error', this.error);
    this.matSnackBar.open(this.error, 'ok', {
    duration: 5000
  });
  }

  getUserAdress() {
    this.userService.getAdress().subscribe((Response) => {
      console.log('address', Response);
      for (const i of Response.obj) {
        if (i.addressType === 'home' && this.selectedtype === 'home') {
          this.setAddresToInput(i);
          console.log('user adress Of Home : ', i);
          this.adressId = i.addressId;
        } else if (i.addressType === 'work' && this.selectedtype === 'work') {
          this.setAddresToInput(i);
          console.log('user adress Of wokr : ', i);
          this.adressId = i.addressId;
        } else if (i.addressType === 'other' && this.selectedtype === 'other') {
          this.setAddresToInput(i);
          console.log('user adress Of wokr : ', i);
          this.adressId = i.addressId;
        }
      }
    });
  }


  setAddresToInput(adressuser: Address) {
    this.Name.setValue(adressuser.name);
    this.phoneNumber.setValue(adressuser.phoneNumber);
    this.pincode.setValue(adressuser.pincode);
    this.locality.setValue(adressuser.locality);
    this.address.setValue(adressuser.address);
    this.city.setValue(adressuser.city);
    this.landmark.setValue(adressuser.landmark);
    this.phoneNumber.setValue(adressuser.phoneNumber);
  }

  addAdress() {
    this.addre.name = this.Name.value;
    console.log('adding adress is ', this.addre);
  }
Toggle() {
  if ( this.select === false) {
    this.select = true;
  } else if ( this.select === true) {
    this.select = false;
  }
}

tog() {
  if ( this.selected === false) {
    this.selected = true;
  } else if ( this.selected === true) {
    this.selected = false;
  }
}

getsession() {
for (let i = 0; i < sessionStorage.length; i++) {
  const key = sessionStorage.key(i);
  this.value[i] = sessionStorage.getItem(key);
  console.log('key', key);
}

}
 fun(type) {
  this.selectedtype = type;
  this.addre.name = (localStorage.getItem('Name'));
  this.addre.phoneNumber = (localStorage.getItem('phone'));

  this.adressId = null;
  this.setAddresToInput(this.addre);
  this.getUserAdress();
  console.log('select item is ' + type);
}


addtcart( user: any) {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    this.value[i] = sessionStorage.getItem(key);
    console.log('key', key);
    console.log('ghgvvb=====' + user);
    console.log('---' + this.bid);
}
}
placeOrder(productId: any) {
  this.isLoading = true;
  console.log('place order', productId);
  console.log('Address', this.address.value);
  this.orderService.placeOrder(productId, this.adressId).subscribe(
    data => this.handleResponseOfPlaceOrder(data),
    error => this.handleError(error));
  
}
  handleResponseOfPlaceOrder(data: any): void {
    this.isLoading = false;
    console.log('data', data);
    sessionStorage.removeItem(data.obj.productsList[0].productId);
    this.matSnackBar.open(data.message , 'ok', {
      duration: 5000
    });
    this.route.navigateByUrl('greeting');
  }
OnRegisterSubmit() {
  this.addre.name = this.Name.value;
  this.addre.locality = this.locality.value;
  this.addre.address = this.address.value;
  this.addre.pincode = this.pincode.value;
  this.addre.phoneNumber = this.phoneNumber.value;
  this.addre.city = this.city.value;
  this.addre.landmark = this.landmark.value;
  if (this.adressId === null || this.adressId === undefined) {
    this.addre.type = this.selectedtype;
    console.log('adress is going to upadted is ' + this.addre);
    this.userService.addAdress(this.addre).subscribe((Response) => {
    console.log('adress address', Response);
    window.location.reload();
  });
 } else {
  this.addre.addressType = this.selectedtype;
  console.log('adress type is selected' ,   this.addre.addressType );
  this.addre.addressId = this.adressId;
  console.log('adress is going to upadted is ', this.addre);
  this.userService.updateAdress(this.addre).subscribe((Response) => {
     console.log('address updated', Response);
   });
 }
}
}
