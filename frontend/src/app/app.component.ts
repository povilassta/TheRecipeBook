import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { User } from './models/user.model';
import { AppStateService } from './services/appState.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private appStateService: AppStateService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'lt']);
    translate.setDefaultLang('en');
    // Restore language
    translate.use(localStorage.getItem('language') || 'en');
    this.appStateService
      .select('currentUser')
      .pipe(untilDestroyed(this))
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

  public useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
}
