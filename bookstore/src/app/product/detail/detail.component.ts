import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IProducts } from 'src/app/shared/interfaces/products';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @ViewChild('amountInput', { static: false }) amountInput: ElementRef<HTMLInputElement>
  @Input() selectedCause2: IProducts;
  
  get selectedCause(){  return this.productService.selectedProduct}

  constructor(private productService: ProductService  ,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.productService.loading(this.activatedRoute.snapshot.params._id).subscribe((product: IProducts) => {
      this.productService.selectProducts(product);
  })
}

makePurchase(){
  
  this.productService.purchase(+this.amountInput.nativeElement.value).subscribe(() =>{
    this.productService.loading();
    this.amountInput.nativeElement.value = '';

  })
}

}

