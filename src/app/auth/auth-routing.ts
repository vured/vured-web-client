import { Routes } from '@angular/router';
import { ConnectComponent } from 'src/app/auth/connect/connect.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { LoginValidUrlGuard } from 'src/app/auth/login/login-valid-url.guard';

export const authRoutes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginValidUrlGuard]
  },
  { path: '', redirectTo: '/connect', pathMatch: 'full' }
];
