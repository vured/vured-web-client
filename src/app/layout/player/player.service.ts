import { Injectable } from '@angular/core';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlayerEventQueueItem } from 'src/app/layout/player/player-event-queue-item';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private webSocket?: WebSocket;

  public events = new Subject<PlayerEventDto>();

  constructor(
    private http: HttpClient
  ) {
  }

  async connect(): Promise<void> {
    let api = localStorage.getItem('api');
    let token = localStorage.getItem('token');

    if (!api || !token) {
      return;
    }

    api = api.replace('https://', 'wss://');
    api = api.replace('http://', 'ws://');

    this.webSocket = new WebSocket(`${ api }/player/${ token }`);

    this.webSocket.onmessage = message => this.handleEvent(message);
  }

  async handleEvent(message: MessageEvent): Promise<void> {
    const blob = message.data as Blob;
    const blobText = await blob.text();
    const event = JSON.parse(blobText) as PlayerEventDto;

    this.events.next(event);
  }

  requestPause(): void {
    this.http.patch('/player/pause', { pause: true }).subscribe();
  }

  requestPlay(): void {
    this.http.patch('/player/pause', { pause: false }).subscribe();
  }

  requestNewVolume(newVolume: number): void {
    this.http.patch('/player/volume', { newVolume }).subscribe();
  }

  requestNext(): void {
    this.http.get('/player/next').subscribe();
  }

  requestStop(): void {
    this.http.get('/player/stop').subscribe();
  }

  requestRemoveFromQueue(queueItem: PlayerEventQueueItem): void {
    this.http.post('/player/remove', queueItem).subscribe();
  }

  requestQueueTrack(url: string, member: string): Promise<Object> {
    return this.http.post('/player/queue', { url, member }).toPromise();
  }
}
