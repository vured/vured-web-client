import { Routes } from '@angular/router';
import { ConnectComponent } from 'src/app/auth/connect/connect.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { LoginValidUrlGuard } from 'src/app/auth/login/login-valid-url.guard';
import { RedirectWhenLoggedInGuard } from 'src/app/auth/redirect-when-logged-in.guard';

export const authRoutes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent,
    canActivate: [RedirectWhenLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectWhenLoggedInGuard, LoginValidUrlGuard]
  },
  { path: '', redirectTo: '/connect', pathMatch: 'full' }
];
