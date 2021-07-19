import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './modal/modal.component';
import { ConnectionLostModalComponent } from './player/connection-lost-modal/connection-lost-modal.component';
import { ModalContainerComponent } from 'src/app/layout/modal/modal-container.component';
import { ModalDirective } from './modal/modal.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    PlayerComponent,
    ModalComponent,
    ConnectionLostModalComponent,
    ModalContainerComponent,
    ModalDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class LayoutModule { }
