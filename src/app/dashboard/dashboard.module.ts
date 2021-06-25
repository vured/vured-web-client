import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PlayingTrackComponent } from './playing-track/playing-track.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    DashboardComponent,
    PlayingTrackComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
