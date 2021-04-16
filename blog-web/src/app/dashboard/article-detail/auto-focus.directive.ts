import { AfterViewInit, Directive, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit, AfterViewInit {
  constructor(
    private viewContainer: ViewContainerRef,
  ) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.viewContainer.element.nativeElement.focus();
    console.log(this.viewContainer.element.nativeElement);
  }
}
