import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

const topRoutes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: '',
    component: LayoutComponent,
    children: routes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(topRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
