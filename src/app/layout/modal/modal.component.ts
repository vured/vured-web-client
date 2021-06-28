import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/layout/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public activeModal?: string;

  constructor(
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.modalService.enableModal.subscribe(name => this.activeModal = name);
    this.modalService.disableModal.subscribe(() => delete this.activeModal);
  }
}
