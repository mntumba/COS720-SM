import { Directive, ElementRef, HostListener } from '@angular/core';
import { IStaticMethods } from 'preline/preline';
import { Modal, Ripple, initTWE } from 'tw-elements';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Directive({
  selector: '[app-btn]',
  standalone: true,
})
export class BtnDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) onClick($event: string) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
      initTWE({ Modal, Ripple });
    }, 1);
  }
}
