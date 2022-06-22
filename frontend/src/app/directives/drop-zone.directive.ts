import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDropZone]',
})
export class DropZoneDirective {
  @HostBinding('class.fileover') fileOver = false;
  @Output() dropped = new EventEmitter<any>();

  constructor() {
    console.log('CREATED DIRECTIVE!!!!');
  }

  @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('Over');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('Leave');
  }

  @HostListener('drop', ['$event']) onDrop(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    console.log('drop');
    this.dropped.emit(evt);
  }
}
