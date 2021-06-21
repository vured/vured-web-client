import { Component, OnInit } from '@angular/core';
import { faPlay, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/layout/player/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public faPlay = faPlay;
  public faStepForward = faStepForward;

  constructor(
    private playerService: PlayerService
  ) {
  }

  ngOnInit(): void {
    this.playerService.connect()
  }

}
