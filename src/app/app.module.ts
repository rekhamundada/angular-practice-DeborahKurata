import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Router} from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { ProductData } from './products/product-data';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
    {  path: 'welcome', component: WelcomeComponent},
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    ProductModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
  ],
 // providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
