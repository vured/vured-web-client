import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faPause, faPlay, faStepForward, faVolumeDown } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/layout/player/player.service';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  public icon = {
    play: faPlay,
    pause: faPause,
    stepForward: faStepForward,
    volumeDown: faVolumeDown
  };

  public lastEvent?: PlayerEventDto;
  public progress?: number;

  private progressInterval: any;

  @ViewChild('volumeSlider') volumeSlider?: ElementRef;

  constructor(
    private playerService: PlayerService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.playerService.connect();

    this.playerService.events.subscribe(event => {
      this.lastEvent = event;
      this.progress = event.position || 0;
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

      if (!this.progress) {
        this.progress = 0;
      }

      this.progress = this.progress + 100;
    }, 100);
  }

  onChangeVolume(): void {
    const newVolume = this.volumeSlider?.nativeElement.value;

    if (newVolume == null) {
      return;
    }

    this.playerService.requestNewVolume(newVolume);
  }

  onClickPlay(): void {
    this.playerService.requestPlay();
  }

  onClickPause(): void {
    this.playerService.requestPause();
  }

  onClickNext(): void {
    this.playerService.requestNext();
  }
}
