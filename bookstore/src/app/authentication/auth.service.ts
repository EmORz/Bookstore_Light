import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';

const appKey = "kid_rkCF3NnM8";
const appSecret = "3e63a5007d244f19b66916e50033fb18";

const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService{

    private currentAuthToken: string;
  isLogged: any;
  currentUser: { model: any } = null;

    constructor(private http: HttpClient){
        const currentUser = localStorage.getItem('current-user');
        this.currentUser = currentUser ? JSON.parse(currentUser) : null;

    }

    login(model: LoginModel){

        localStorage.setItem('current-user', JSON.stringify({ model}));
        this.currentUser = {model };
        return this.http.post(loginUrl, JSON.stringify(model), { 
            headers: this.createAuthHeaders('Basic')
        });
    }

    register(model: RegisterModel){
        return this.http.post(registerUrl, JSON.stringify(model), { 
            headers: this.createAuthHeaders('Basic')
        });
    }
    logout(){
      debugger
      this.currentUser = null;
      localStorage.removeItem('current-user');
        return this.http.post(logoutUrl, {}, { 
            headers: this.createAuthHeaders('Kinvey')
        });
    }

    checkIfLogged(){
        return this.currentAuthToken === localStorage.getItem('authtoken');
    }

    get authtoken(){
        return this.currentAuthToken;
    }
    set authtoken(value: string){
        this.currentAuthToken = value;
    }

    private createAuthHeaders(type: string) {
       if(type === 'Basic'){
        return new HttpHeaders({
            "Authorization": 'Basic ' + btoa(`${appKey}:${appSecret}`),
            "Content-Type": "application/json"
        })  
       }else{
        return new HttpHeaders({
            "Authorization": 'Kinvey ' + `${localStorage.getItem('authtoken')}`,
            "Content-Type": "application/json"
       }) 
    }
}
}