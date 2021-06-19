import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { authRoutes } from 'src/app/auth/auth-routing';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserResolver } from 'src/app/user/user.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

const topRoutes: Routes = [
  {
    path: '',
    children: authRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    children: routes,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(topRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
