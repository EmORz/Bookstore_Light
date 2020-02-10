import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IProduct } from '../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: IProduct[];

  readonly selectedProduct: IProduct;

  constructor(private http: HttpClient) { }

  load(id?: number) {
    return this.http.get<IProduct[] | IProduct>(`http://localhost:3000/causes${id ? `/${id}` : ''}`).pipe(
      tap((products) => this.product = [].concat(products))
    );
  }

  // donate(amount: number) {
  //   return this.http.put<IProduct>(`http://localhost:3000/causes/${this.selectedCause._id}`, {
  //     body: { collectedAmount: this.selectedCause.collectedAmount + amount }
  //   });
  // }

  selectProduct(product: IProduct) {
    (this as any).selectedProduct = product;
  }
}
