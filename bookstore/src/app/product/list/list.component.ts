import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IProduct } from "src/app/shared/interfaces/product";
import { ProductService } from "../product.service";
import { IProducts } from 'src/app/shared/interfaces/products';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  selectProducts: any;
  // get products() {
  //   return this.productService.product;
  // }
  get productss() {
    return this.productService.products;
  }

  @Output() selectProduct: EventEmitter<IProducts> = new EventEmitter();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.loading().subscribe();
    // this.productService.load().subscribe();
  }

  // selectProductHandler(cause: IProduct) {
  //   // this.selectCause.emit(cause);
  //   this.productService.selectProduct(cause);
  // }
  selectProductHandlers(cause: IProducts) {
    
    // this.selectProducts.emit(cause);
    this.productService.selectProducts(cause);
  }
}
