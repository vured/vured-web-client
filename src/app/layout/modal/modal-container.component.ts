import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Modal } from 'src/app/layout/modal/modal';

@Component({
  template: `
    <ng-template #modalContainer></ng-template>
  `
})
export class ModalContainerComponent {

  @ViewChild('modalContainer', { read: ViewContainerRef })
  private modalContainer?: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  createModal<T extends Modal>(component: Type<T>): ComponentRef<T> | null {
    if (this.modalContainer == null) {
      return null;
    }

    this.modalContainer?.clear();

    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);

    return this.modalContainer?.createComponent(factory, 0);
  }
}
