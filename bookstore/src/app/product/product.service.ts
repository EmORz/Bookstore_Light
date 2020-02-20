import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { IProduct } from "../shared/interfaces/product";
import { CreateModel } from "../product/models/create.model";
import { IProducts } from "../shared/interfaces/products";

const appKey = "kid_rkCF3NnM8";
const appSecret = "3e63a5007d244f19b66916e50033fb18";

const createProductUrl = `https://baas.kinvey.com/appdata/${appKey}/products/`;
const loadProductUrl = `https://baas.kinvey.com/appdata/${appKey}/products/`;
const productUrl = `https://baas.kinvey.com/appdata/${appKey}/products/`;

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products: IProducts[];

  readonly selectedProduct: IProducts;

  constructor(private http: HttpClient) {}

  loading(id?: string) {
    return this.http
      .get<IProducts[] | IProducts>(`${loadProductUrl}${id ? `/${id}` : ""}`, {
        headers: this.createAuthHeaders("Kinvey")
      })
      .pipe(tap(products => (this.products = [].concat(products))));
  }

  selectProducts(products: IProducts) {
    (this as any).selectedProduct = products;
  }

  purchase(quantity: number) {
    debugger;
    return this.http.put<IProducts>(
      `${productUrl}${this.selectedProduct._id}`,
      {
        "_id": this.selectedProduct._id,
        "title": this.selectedProduct.title,
        "author": this.selectedProduct.author,
        "description": this.selectedProduct.description,
        "picture": this.selectedProduct.picture,
        "price": this.selectedProduct.price,
        "quantity": this.selectedProduct.quantity - quantity,
        "totalMone": this.selectedProduct.totalMone+=(+this.selectedProduct.price * +quantity) 
      },
      {
        headers: this.createAuthHeaders("Kinvey")
      }
    );
  }

  remove() {
    return this.http.delete(`${productUrl}${this.selectedProduct._id}`, {
      headers: this.createAuthHeaders("Kinvey")
    });
  }

  createEntity(model: CreateModel) {
    return this.http.post(createProductUrl, JSON.stringify(model), {
      headers: this.createAuthHeaders("Kinvey")
    });
  }

  private createAuthHeaders(type: string) {
    if (type === "Basic") {
      return new HttpHeaders({
        Authorization: "Basic " + btoa(`${appKey}:${appSecret}`),
        "Content-Type": "application/json"
      });
    } else {
      return new HttpHeaders({
        Authorization: "Kinvey " + `${localStorage.getItem("authtoken")}`,
        "Content-Type": "application/json"
      });
    }
  }
}
