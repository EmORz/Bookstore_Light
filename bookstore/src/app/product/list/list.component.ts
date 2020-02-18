import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IProduct } from "src/app/shared/interfaces/product";
import { ProductService } from "../product.service";
import { IProducts } from 'src/app/shared/interfaces/products';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  selectProducts: any;
  
  get products() {
    return this.productService.products;
  }
  get currentUser() {
    let username = this.authService.username;    
    return username
  }
  get isLogged(){
    debugger
    return this.authService.checkIfLogged
  }
  get isAdmin(){
    return this.authService.roles && this.authService.checkIfLogged;
  }

  @Output() selectProduct: EventEmitter<IProducts> = new EventEmitter();

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit() {
    this.productService.loading().subscribe();
  }
  selectProductHandlers(cause: IProducts) {
    this.productService.selectProducts(cause);
  }
}
