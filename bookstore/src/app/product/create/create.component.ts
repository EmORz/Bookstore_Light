import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CreateModel } from '../models/create.model';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  model: CreateModel;
  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { 
    this.model = new CreateModel('','',16, 9, '','')
  }

  ngOnInit() {
  }

  create(){
    this.productService.createEntity(this.model).subscribe(
      
      data => {
        debugger
        this.router.navigateByUrl('/home')
      },
      err => {
        console.log(err)
      }
    )
  }

}
