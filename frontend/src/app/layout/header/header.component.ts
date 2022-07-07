import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateService } from 'src/app/services/appState.service';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private appStateService: AppStateService,
    private translate: TranslateService
  ) {
    this.appStateService
      .select('currentUser')
      .subscribe((user: User | undefined) => {
        this.currentUser = user;
      });
    this.languages = this.translate.getLangs();
  }

  public currentUser: User | undefined;
  @Output()
  public toggleSidenav = new EventEmitter<void>();
  public language = localStorage.getItem('language') || 'en';
  @Output()
  public changeLanguage = new EventEmitter<string>();
  public languages: string[] = [];

  public updateLanguage(lang: string): void {
    this.language = lang;
    this.changeLanguage.emit(lang);
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
