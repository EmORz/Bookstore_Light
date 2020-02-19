import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";
import { IProduct } from "src/app/shared/interfaces/product";
import { IProducts } from "src/app/shared/interfaces/products";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  @ViewChild("amountInput", { static: false }) amountInput: ElementRef<
    HTMLInputElement
  >;
  @Input() selectedProduct2: IProducts;

  get selectedProduct() {
    return this.productService.selectedProduct;
  }

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService
      .loading(this.activatedRoute.snapshot.params._id)
      .subscribe((product: IProducts) => {
        this.productService.selectProducts(product);
      });
  }

  isHasCredentials() {    
    let h = this.authService.checkIfLogged() && this.authService.roles;    
    if (h) {
      return true;
    }
    return false;
  }
  makePurchase() {
    this.productService
      .purchase(+this.amountInput.nativeElement.value)
      .subscribe(() => {
        this.productService.loading();
        this.amountInput.nativeElement.value = "";
      });
  }
  removeProduct() {  
    if (this.isHasCredentials()) {
      this.productService.remove().subscribe(() => {
        this.productService.loading();
      });
    }
 
  }
}
