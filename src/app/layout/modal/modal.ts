import { ModalRef } from 'src/app/layout/modal-ref';

export abstract class Modal {

  modalInstance?: ModalRef;

  abstract onInjectData(input: any): void;

  triggerClose(output?: any): void {
    this.modalInstance?.close(output);
  }
}
