import { Component, Input, OnInit } from '@angular/core';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.sass'],
})
export class ThumbnailComponent implements OnInit {
  constructor(
    private componentCommunicationService: ComponentCommunicationService
  ) {}

  @Input()
  public preview = '';
  @Input()
  public index = -1;

  public unselectFile(): void {
    this.componentCommunicationService.callUnselectFile(this.index);
  }

  ngOnInit(): void {}
}
