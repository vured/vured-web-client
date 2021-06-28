import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public enableModal = new Subject<string>();
  public disableModal = new Subject<string>();

  constructor() {
  }
}
