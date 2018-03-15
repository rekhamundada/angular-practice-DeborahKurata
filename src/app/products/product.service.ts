import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from './product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService  {
// private productsUrl  = './api/products/products.json';
private productsUrl = 'api/products';
private products: IProduct[];
private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
 // below $ sign indicates it is an observable and not a simple property and we are making it read only observable from subject
 selectedProductChanges$ = this.selectedProductSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedProduct(selectedProduct: IProduct | null): void {
    this.selectedProductSource.next(selectedProduct);
}

  getProducts(): Observable<IProduct[]> {
    if (this.products) {
      return of(this.products);
    }
    return this.http.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.products = data),
        catchError(this.handleError)
    );
    // return this.http.get<IProduct[]>(this.productsUrl)
    //   .do(
    //     data => console.log(JSON.stringify(data)))
    //     .catch(this.handleError);
  }

  // getProduct(id: number): Observable<IProduct> {
  //   return this.getProducts()
  //     .map((products: IProduct[]) => products.find(p => p.id === id));
  // }
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
        return of(this.initializeProduct());
    }
    if (this.products) {
        const foundItem = this.products
        .find(item => item.id === id);
        if (foundItem) {
            return of(foundItem);
        }
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url)
                    .pipe(
                        tap(data => console.log('Data: ' + JSON.stringify(data))),
                        catchError(this.handleError)
                    );
}

  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
        'id': 0,
        productName: '',
        productCode: '',
        category: '',
        tags: [],
        releaseDate: '',
        price: 0,
        description: '',
        starRating: 0,
        imageUrl: ''
    };
}
private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
  product.id = null;
  return this.http.post<IProduct>(this.productsUrl, product,  { headers: headers} )
  .pipe(
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      tap(data => {
          this.products.push(data);
          this.changeSelectedProduct(data);
      }),
      catchError(this.handleError)
  );
}

}
