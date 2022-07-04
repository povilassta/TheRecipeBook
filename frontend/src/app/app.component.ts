import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from './models/user.model';
import { AppStateService } from './services/appState.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(private appStateService: AppStateService) {
    this.appStateService
      .select('currentUser')
      .subscribe((user: User | undefined) => {
        this.currentUser = user;
      });
  }
  title = 'recipe-book';

  @ViewChild('sidenav')
  private sidenav: MatSidenav | undefined;
  public currentUser: User | null | undefined;

  @HostListener('window:resize', ['$event'])
  public onResize(event: { target: { innerWidth: number } }): void {
    if (event.target.innerWidth > 700) {
      this.sidenav?.close();
    }
  }
}
