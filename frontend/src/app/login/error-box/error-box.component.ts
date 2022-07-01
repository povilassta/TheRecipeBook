import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.sass'],
})
export class ErrorBoxComponent implements OnInit {
  constructor() {}
  @Input()
  public errorMessage = '';

  @Output()
  public discardErr = new EventEmitter();

  ngOnInit(): void {}
}
