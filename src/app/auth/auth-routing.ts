import { Routes } from '@angular/router';
import { ConnectComponent } from 'src/app/auth/connect/connect.component';

export const authRoutes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent
  },
  {
    path: '',
    redirectTo: '/connect',
    pathMatch: 'full'
  }
];
