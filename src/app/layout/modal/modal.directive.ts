import { Directive, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/layout/modal/modal.service';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {
    this.modalService.setupViewContainerRef(viewContainerRef);
  }
}
