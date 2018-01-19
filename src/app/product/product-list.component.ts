import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { StarComponent } from '../shared/star.component';
@Component({
  // selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit {
  pageTitle: string= 'Product list';
  imageWidth: number= 50;
  imageHeight: number= 2;
  showImage: boolean= false;
  errorMessage: string;

 _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [];

constructor(private productService: ProductService) {
  //this.listFilter = 'cart';
}

performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
}
 toggleImage(): void {
  this.showImage = !this.showImage;
 }
 ngOnInit(): void {
   console.log('implemneting lifecycle hook OnInit');
   this.productService.getProducts()
    .subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );


 }
 onRatingClicked(message: string): void {
   this.pageTitle = 'Product List: ' + message;
 }
}
