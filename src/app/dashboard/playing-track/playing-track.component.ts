import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/layout/player/player.service';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';
import { faClock, faUser, faTrashAlt, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { PlayerEventQueueItem } from 'src/app/layout/player/player-event-queue-item';

@Component({
  selector: 'app-playing-track',
  templateUrl: './playing-track.component.html',
  styleUrls: ['./playing-track.component.scss']
})
export class PlayingTrackComponent implements OnInit {
  public icon = {
    clock: faClock,
    user: faUser,
    trash: faTrashAlt,
    volumeMute: faVolumeMute
  };

  public lastEvent?: PlayerEventDto;

  constructor(
    private playerService: PlayerService
  ) {
  }

  ngOnInit(): void {
    this.playerService.events.subscribe(event => this.lastEvent = event);
  }

  isYoutube(uri?: string): boolean {
    return uri?.startsWith('https://www.youtube.com/') || false;
  }

  getDurationFromMilliseconds(ms: number = 0): string {
    function pad(num: number) {
      return `${num}`.padStart(2, '0');
    }

    let asSeconds = ms / 1000;

    let hours = undefined;
    let minutes = Math.floor(asSeconds / 60);
    let seconds = Math.floor(asSeconds % 60);

    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes %= 60;
    }

    return hours
      ? `${(pad(hours))}:${pad(minutes)}:${pad(seconds)}`
      : `${(pad(minutes))}:${pad(seconds)}`;
  }

  removeFromQueue(queueItem: PlayerEventQueueItem) {
    this.playerService.requestRemoveFromQueue(queueItem);
  }
}
