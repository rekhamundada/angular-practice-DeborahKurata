import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { StarComponent } from '../shared/star.component';
import { NgModel } from '@angular/forms';

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

  filteredProducts: IProduct[];
  products: IProduct[] = [];

  includeDetail: boolean = true;

constructor(
  private productService: ProductService,
  ) {
}
// performFilter(filterBy: string): IProduct[] {
//   filterBy = filterBy.toLocaleLowerCase();
//     return this.products.filter((product: IProduct) =>
//       product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 );
// }
performFilter(filterBy?: string): void {
  if (filterBy) {
      this.filteredProducts = this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  } else {
      this.filteredProducts = this.products;
  }
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
        // this.performFilter()
      },
      error => this.errorMessage = <any>error
    );
 }
//  ngAfterViewInit() {
//   this.filterInput.valueChanges
//     .subscribe(
//       () => this.performFilter(this.listFilter)
//     );
//  }
 onRatingClicked(message: string): void {
   this.pageTitle = 'Product List: ' + message;
 }
}
