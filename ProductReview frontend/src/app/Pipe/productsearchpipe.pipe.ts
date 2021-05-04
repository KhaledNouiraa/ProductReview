import { Pipe, PipeTransform } from '@angular/core';
import { ProductModule } from '../Model/product/product.module';

@Pipe({
  name: 'productsearchpipe'
})
export class ProductsearchpipePipe implements PipeTransform {

  transform(product: ProductModule[], searchTerm: string) {
    if (!product || !searchTerm) {
      console.log('searching the ' + searchTerm);
      return product;
    } else {
      // tslint:disable-next-line: no-shadowed-variable
      return product.filter(product => {
            if (searchTerm && product.productName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                return true;
            }
            if (searchTerm && product.authorName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                return true;
            }
            if (searchTerm && product.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                return true;
            }
            return false;
       });

    }
  }

}
