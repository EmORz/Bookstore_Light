import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  form: FormGroup;

  get currentUser() {
    let username = this.authService.username;   
 
    return username
  }
  get currentEmail() {
    let email = this.authService.email;   
 
    return email
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
    
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(new RegExp("[a-zA-Z0-9.-_]{6,}@gmail.com"))
        ]
      ],
      passwords: this.fb.group({
        password: ["", [Validators.required]],
        rePassword: ["", [Validators.required]]
      })
    });
  }

  ngOnInit() {}

  logout() {
    this.authService.logout().subscribe(data => {
      localStorage.clear();
      this.authService.authtoken = "";
      this.userService.logout();
      this.router.navigateByUrl("/login");
    });
  }
}
