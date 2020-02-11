import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/product/create'
      },    
      {
        path: 'create',
        component: CreateComponent
     
      },  
      {
        path: 'detail/:id',
        component: DetailComponent
      }
      
    ]
  }
];

export const ProductRoutingModule = RouterModule.forChild(routes);
