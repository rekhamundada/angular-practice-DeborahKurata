import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';



@Component({
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string;
  imageWidth: number= 100;
  imageHeight: number= 4;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    const param = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${param}`;
    if (param) {
      const id = param;
      this.getProduct(id);
    }
  }
onBack(): void {
this.router.navigate(['/products']);
}
getProduct(id: number) {
  this.productService.getProduct(id)
    .subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error
    );
}

}
