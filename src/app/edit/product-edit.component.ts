import { Component, OnInit, ViewChild } from '@angular/core';

import { IProduct } from '../products/product';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild(NgForm) editForm: NgForm;
  pageTitle: string = 'Product Edit';
  errorMessage: string;
  private originalProduct: IProduct;
  product: IProduct;

  get isDirty(): boolean {
    return this.editForm.dirty ? true : false;
}
constructor(private productService: ProductService,
  private router: Router,
  private route: ActivatedRoute) {
}


  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];

      });
  }
  getProduct(id: number): void {
    this.productService.getProduct(id)
        .subscribe(
            product => this.onProductRetrieved(product),
            error => this.errorMessage = <any>error
        );
}
onProductRetrieved(product: IProduct): void {
  // Reset back to pristine
  this.editForm.reset();

  // Display the data in the form
  // Use a copy to allow cancel.
  this.originalProduct = product;
  this.product = Object.assign({}, product);

  if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
  } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
  }
}
cancel(): void {
  // Navigate back to the product list
  this.router.navigate(['/products']);
}

saveProduct() {

}
  onSaveComplete(): void {
    // Reset back to pristine
    this.editForm.reset(this.editForm.value);
    // Navigate back to the product list
    this.router.navigate(['/products']);
}
}
