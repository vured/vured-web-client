import { Injectable } from '@angular/core';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private webSocket?: WebSocket;

  public events = new Subject<PlayerEventDto>()

  constructor() {
  }

  async connect(): Promise<void> {
    let api = localStorage.getItem('api');
    let token = localStorage.getItem('token');

    if (!api || !token) {
      return;
    }

    api = api.replace('https://', 'wss://');
    api = api.replace('http://', 'ws://');

    this.webSocket =  new WebSocket(`${ api }/player/${ token }`);

    this.webSocket.onmessage = message => this.handleEvent(message);
  }

  async handleEvent(message: MessageEvent) {
    const blob = message.data as Blob;
    const blobText = await blob.text();
    const event = JSON.parse(blobText) as PlayerEventDto;

    this.events.next(event)
  }
}
