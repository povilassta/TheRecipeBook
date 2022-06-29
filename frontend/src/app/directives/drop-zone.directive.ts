import {
  Directive,
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

  constructor() {}

  @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.dropped.emit(evt);
  }
}
