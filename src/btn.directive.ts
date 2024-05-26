import { Directive, ElementRef, HostListener } from '@angular/core';
import { Modal, Ripple, initTWE } from 'tw-elements';

@Directive({
  selector: '[app-btn]',
  standalone: true,
})
export class BtnDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) onClick($event: string) {
    setTimeout(() => {
      initTWE({ Modal, Ripple });
    }, 1);
  }
}
