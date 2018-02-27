import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { StarComponent } from '../shared/star.component';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  // selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit, AfterViewInit {

  pageTitle: string = 'Product list';
  imageWidth: number= 50;
  imageHeight: number= 2;
  errorMessage: string;
  includeDetail: boolean = true;
 // showImage: boolean= false;
 // parentListFilter: string;
  filteredProducts: IProduct[];
  products: IProduct[];

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
get showImage(): boolean {
  return this.productParameterService.showImage;
}
set showImage(value: boolean) {
  this.productParameterService.showImage = value;
}
constructor(
  private productService: ProductService,
  private productParameterService: ProductParameterService
  ) {
}
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
 ngAfterViewInit(): void {
  // this.parentListFilter = this.filterComponent.listFilter;
}
 ngOnInit(): void {
   console.log('implemneting lifecycle hook OnInit');
   this.productService.getProducts()
    .subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      // this.performFilter(this.parentListFilter);
      },
      error => this.errorMessage = <any>error
    );
 }
 onValueChange(value: string): void {
   this.productParameterService.filterBy = value;
   this.performFilter(value);
 }
 onRatingClicked(message: string): void {
   this.pageTitle = 'Product List: ' + message;
 }
}
