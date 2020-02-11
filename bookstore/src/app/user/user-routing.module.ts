import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UserComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);
