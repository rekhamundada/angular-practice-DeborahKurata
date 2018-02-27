import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductService } from './product.service';
import { SharedModule } from './../shared/shared.module';
import { ProductParameterService } from './product-parameter.service';
import { ProductEditComponent } from '../edit/product-edit.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductShellListComponent } from './product-shell/product-shell-list.component';
import { ProductShellDetailComponent } from './product-shell/product-shell-detail.component';


@NgModule({
  imports: [

    RouterModule.forChild([
      // {path: 'products', component: ProductListComponent},
      {path: 'products', component: ProductShellComponent },
      {path: 'products/:id', component: ProductDetailComponent},
      {path: 'products/:id/edit', component: ProductEditComponent}
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ConvertToSpacesPipe,
    ProductShellComponent,
    ProductShellListComponent,
    ProductShellDetailComponent,

  ],
  providers: [ProductService, ProductParameterService],
})
export class ProductModule { }
