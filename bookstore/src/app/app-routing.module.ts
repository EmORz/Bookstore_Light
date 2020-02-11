import {Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [

    {path: '', pathMatch: 'full', component: HomeComponent},  
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: NotFoundComponent}
 
];



  export const AppRoutingModule = RouterModule.forRoot(routes);
