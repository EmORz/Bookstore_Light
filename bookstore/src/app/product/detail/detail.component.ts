import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";
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
    private activatedRoute: ActivatedRoute,
    private router: Router
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
  isAvailable() {
    let test = this.selectedProduct.quantity > 0;
    if (test) {
      return true;
    }
    return false;
  }
  makePurchase() {    
    if (this.authService.authtoken) {
      let result = confirm("Do you want this product?");
      debugger
      if (result) {
        this.productService
          .purchase(+this.amountInput.nativeElement.value)
          .subscribe(() => {
            debugger;
            console.log("its ok!");
            this.productService.loading();
            this.amountInput.nativeElement.value = "";
          });
      }else {
        this.router.navigateByUrl('');
      }
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  removeProduct() {
    let test = confirm("Are are you shure, this will delete product from DB?");
    if (this.isHasCredentials() && test) {
      this.productService.remove().subscribe(() => {
        this.productService.loading();
      });
    }
  }
}
