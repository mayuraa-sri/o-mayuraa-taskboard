import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {fromEvent} from 'rxjs';

@Directive({
  selector: '[tbDragAndDrop]'
})
export class DragAndDropDirective implements OnInit {

  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  constructor(private el: ElementRef,
              private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'mouseenter').subscribe(x => {
      this.renderer2.setStyle(this.el.nativeElement, 'cursor', 'grab');
    });
  }

  // @HostListener('mouseenter') mouseenter(eventData: Event): any {
  //   console.log('Black');
  //   this.renderer2.setStyle(this.el.nativeElement, 'cursor', 'grab');
  // }

  dragTask(e): void {
    // get the mouse cursor position at startup:
    console.log(e);
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
  }

  elementDrag(e): void {
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.renderer2.setStyle(this.el.nativeElement, 'top', (this.el.nativeElement.offsetTop - this.pos2) + 'px');
    this.renderer2.setStyle(this.el.nativeElement, 'left', (this.el.nativeElement.offsetLeft - this.pos1) + 'px');
  }

  @HostListener('mousemove', ['$event']) mousemove(eventData: Event): any {
    console.log('Black', eventData);
    this.renderer2.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
    this.elementDrag(eventData);
  }

  @HostListener('mousedown', ['$event']) mousedown(eventData: Event): any {
    console.log('Black', eventData);
    this.renderer2.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
    this.dragTask(eventData);
  }

  @HostListener('mouseup') mouseleave(eventData: Event): any {
    console.log('yellow');
    this.renderer2.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

}
