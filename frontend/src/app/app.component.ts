import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ComponentCommunicationService } from './services/componentCommunication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private componentCommunicationService: ComponentCommunicationService
  ) {
    this.componentCommunicationService.updateUserCalled$.subscribe(
      () => (this.currentUser = localStorage.getItem('username') || '')
    );
  }
  title = 'recipe-book';

  @ViewChild('sidenav')
  private sidenav: MatSidenav | undefined;
  public currentUser: string = localStorage.getItem('username') || '';

  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    if (event.target.innerWidth > 700) {
      this.sidenav?.close();
    }
  }
}
