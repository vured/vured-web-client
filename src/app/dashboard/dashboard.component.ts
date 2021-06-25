import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/layout/player/player.service';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public lastEvent?: PlayerEventDto;

  constructor(
    private playerService: PlayerService
  ) {
  }

  ngOnInit(): void {
    this.playerService.events.subscribe(event => this.lastEvent = event);
  }
}
