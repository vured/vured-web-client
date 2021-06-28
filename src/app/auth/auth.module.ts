import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from 'src/app/auth/connect/connect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DirectConnectComponent } from './connect/direct-connect/direct-connect.component';

@NgModule({
  declarations: [
    ConnectComponent,
    LoginComponent,
    DirectConnectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
