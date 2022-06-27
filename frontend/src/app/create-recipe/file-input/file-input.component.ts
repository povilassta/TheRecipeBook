import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';

@UntilDestroy()
@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.sass'],
})
export class FileInputComponent implements OnInit {
  constructor(
    private componentCommunicationService: ComponentCommunicationService
  ) {
    this.componentCommunicationService.unselectFileCalled$
      .pipe(untilDestroyed(this))
      .subscribe((index) => {
        this.files.splice(index, 1);
        this.previews.splice(index, 1);
        this.filesAdded.emit(this.files);
      });
  }
  public files: File[] = [];
  public previews: string[] = [];

  @Output() filesAdded = new EventEmitter<File[]>();

  public openUploadDialog(): void {
    document.getElementById('fileInput')?.click();
  }

  public onFileChange(event: any) {
    const input = event.target.files || event.dataTransfer.files;
    if (input) {
      for (let i = 0; i < input.length; i++) {
        this.files.push(input[i]); // Add a file to files array
        const reader = new FileReader();
        reader.onload = () => {
          this.previews.push(reader.result as string); // Add preview url to previews array
        };
        reader.readAsDataURL(input[i]);
      }
      this.filesAdded.emit(this.files);
    }
  }

  ngOnInit(): void {}
}
