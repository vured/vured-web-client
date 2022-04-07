import { Modal } from 'src/app/layout/modal/modal';
import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private result = new Subject<any>();

  constructor(
    private modal: ComponentRef<Modal>
  ) {
    this.modal.instance.modalInstance = this;
  }

  close(output?: any): void {
    this.result.next(output);
    this.destroy();
  }

  onResult(): Observable<any> {
    return this.result.asObservable();
  }

  private destroy(): void {
    this.modal.destroy();
    this.result.complete();
  }
}
