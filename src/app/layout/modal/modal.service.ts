import { ComponentFactory, ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalContainerComponent } from 'src/app/layout/modal/modal-container.component';
import { ModalRef } from 'src/app/layout/modal-ref';
import { Modal } from 'src/app/layout/modal/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalContainerFactory?: ComponentFactory<ModalContainerComponent>;
  private viewContainerRef?: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.setupModalContainerFactory();
  }

  setupViewContainerRef(viewContainerRef: ViewContainerRef): void {
    if(this.viewContainerRef) {
      this.viewContainerRef.clear();
    }

    this.viewContainerRef = viewContainerRef;
  }

  open<T extends Modal>(component: Type<T>, data?: any): ModalRef {
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    const modalComponentRef = this.viewContainerRef?.createComponent(factory, 0);
    const activeElement = document.activeElement as HTMLElement;

    if(!modalComponentRef) {
      throw "Failed to create modal";
    }

    if(data) {
      modalComponentRef?.instance?.onInjectData(data)
    }

    activeElement.blur();

    return new ModalRef(modalComponentRef);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
  }
}
