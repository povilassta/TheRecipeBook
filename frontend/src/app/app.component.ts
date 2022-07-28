import { Component, HostListener, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { User } from './models/user.model';
import { AppStateService } from './services/appState.service';
import { AuthService } from './services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private appStateService: AppStateService,
    public translate: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public authService: AuthService
  ) {
    // Language
    translate.addLangs(['en', 'lt']);
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('language') || 'en');

    this.matIconRegistry.addSvgIcon(
      'en',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/gb.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'lt',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/lt.svg')
    );

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
