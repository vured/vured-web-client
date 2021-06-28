import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './modal/modal.component';
import { ConnectionLostModalComponent } from './modal/connection-lost-modal/connection-lost-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    PlayerComponent,
    ModalComponent,
    ConnectionLostModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class LayoutModule { }
