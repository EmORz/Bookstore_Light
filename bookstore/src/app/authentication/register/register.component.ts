import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model: RegisterModel;
  constructor(private authService: AuthService, private router: Router) { 
    this.model = new RegisterModel('','','','','',18)
  }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(
      data => {
        debugger
        this.router.navigateByUrl('/login')
      },
      err => {
        console.log(err)
      }
    )
  }

}
