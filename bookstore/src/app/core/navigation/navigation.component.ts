import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  get currentUser() {
    let username = this.authService.username;    
    return username
  }
  ngOnInit() {
  }

  isAdmin(){
    if(this.authService.roles){
      return true
    }
  }
  logout(){
    this.authService.logout()
    .subscribe( data => {
      localStorage.clear();
      this.authService.authtoken = "";
      this.router.navigateByUrl('/login');

    })
  }

}
