import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  get products() { return this.productService.product; }

  @Output() selectProduct: EventEmitter<IProduct> = new EventEmitter();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.load().subscribe();
  }

  selectProductHandler(cause: IProduct) {
    // this.selectCause.emit(cause);
    this.productService.selectProduct(cause);
  }

}
