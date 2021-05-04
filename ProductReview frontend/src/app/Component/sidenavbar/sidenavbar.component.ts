

import { Router, ActivatedRoute,ParamMap} from '@angular/router';

import { Component, OnInit ,ViewChild  } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenavModule;
  isSeller = false;
  isAdmin=false;
  role:string;

  constructor(private router:Router,private route:ActivatedRoute,) { }




  ngOnInit() {
   this.role= localStorage.getItem('role');
   console.log('role check sidenav',this.role);
   if (this.role === 'admin') 
   {
     this.isAdmin=true;
   }
   if (this.role === 'seller') 
   {
     this.isSeller=true;
   }
  }
  sellerProducts()
  {
    this.router.navigate(['products'],{queryParams:{product:'unverified'}});
  }

  orders()
  {
    this.router.navigate(['products'],{queryParams:{product:'order'}});
  }

  reviews()
  {
    this.router.navigate(['products'],{queryParams:{product:'review'}});
  }

  products()
  {
    this.router.navigate(['products'],{queryParams:{product:'products'}});
  }


  sellerProduct(){
    
      this.router.navigate(['products'],{queryParams:{product:'sellerproduct'}});
  }

  orderStatus(){

this.router.navigate(['products'],{queryParams:{product:'order'}});
  }
  
}
