import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() selectedCause2: IProduct;
  
  get selectedCause(){return this.productService.selectedProduct}

  constructor(private productService: ProductService  ,  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productService.load(+this.activatedRoute.snapshot.params.id).subscribe((product: IProduct) => {
      this.productService.selectProduct(product);
  })
}
}

