import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/layout/player/player.service';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  public faPlay = faPlay;
  public faPause = faPause;
  public faStepForward = faStepForward;

  public lastEvent?: PlayerEventDto;
  public progress?: number;

  private progressInterval: any;

  constructor(
    private playerService: PlayerService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.playerService.connect();

    this.playerService.events.subscribe(event => {
      console.log(event);
      this.lastEvent = event;
      this.progress = event.position || 0;
      console.log(this.progress);
      this.startProgress();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.progressInterval);
  }

  startProgress(): void {
    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      if (!this.lastEvent?.duration || this.lastEvent?.isPaused) {
        clearInterval(this.progressInterval);
        return;
      }

      if(!this.progress) {
        this.progress = 0;
      }

      this.progress = this.progress + 100;
    }, 100);
  }
}
