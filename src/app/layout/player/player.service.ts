import { Injectable } from '@angular/core';
import { PlayerEventDto } from 'src/app/layout/player/player-event-dto';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlayerEventQueueItem } from 'src/app/layout/player/player-event-queue-item';
import { PlayerMessageEventDto } from 'src/app/layout/player/player-message-event-dto';
import { ModalService } from 'src/app/layout/modal/modal.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private messageSocket?: WebSocket;
  private playerSocket?: WebSocket;

  public messageEvents = new Subject<PlayerMessageEventDto>();
  public events = new Subject<PlayerEventDto>();

  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  async connect(): Promise<void> {
    let api = localStorage.getItem('api');
    let token = localStorage.getItem('token');

    if (!api || !token) {
      await this.router.navigate(['login']);
      return;
    }

    try {
      this.authService.validateToken();
    } catch {
      await this.router.navigate(['login']);
      return;
    }

    api = api.replace('https://', 'wss://');
    api = api.replace('http://', 'ws://');

    this.playerSocket = new WebSocket(`${ api }/player/${ token }`);
    this.messageSocket = new WebSocket(`${ api }/player/message/${ token }`);

    this.playerSocket.onopen = () => this.modalService.disableModal.next();
    this.playerSocket.onclose = () => this.restoreConnectionAndSendError();

    this.playerSocket.onmessage = message => this.handlePlayerEvent(message);
    this.messageSocket.onmessage = message => this.handlePlayerMessageEvent(message);
  }

  async handlePlayerEvent(message: MessageEvent): Promise<void> {
    const blob = message.data as Blob;
    const blobText = await blob.text();
    const event = JSON.parse(blobText) as PlayerEventDto;

    this.events.next(event);
  }

  async handlePlayerMessageEvent(message: MessageEvent): Promise<void> {
    const blob = message.data as Blob;
    const blobText = await blob.text();
    const event = JSON.parse(blobText) as PlayerMessageEventDto;

    this.messageEvents.next(event);
  }

  restoreConnectionAndSendError(): void {
    this.modalService.enableModal.next('connection-lost');
    setTimeout(() => this.connect(), 2000);
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
