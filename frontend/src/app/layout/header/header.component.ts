import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateService } from 'src/app/services/appState.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private appStateService: AppStateService
  ) {
    this.appStateService
      .select('currentUser')
      .subscribe((user: User | undefined) => {
        this.currentUser = user;
      });
  }

  public currentUser: User | undefined;
  @Output()
  public toggleSidenav = new EventEmitter<void>();

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
