import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.sass'],
})
export class FileInputComponent implements OnInit {
  constructor() {}
  public files: FileList | undefined;
  public previews: string[] = [];

  public openUploadDialog(): void {
    document.getElementById('fileInput')?.click();
  }

  public onFileChange(event: any) {
    this.files = event.target.files;
    if (this.files)
      for (let i = 0; i < this.files?.length || 0; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.previews.push(reader.result as string);
        };
        reader.readAsDataURL(this.files[i]);
      }
  }

  ngOnInit(): void {}
}
