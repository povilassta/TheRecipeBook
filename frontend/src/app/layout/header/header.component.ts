import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {
    this.authService.user$.subscribe((res) => {
      this.currentUser = res.isAuthenticated ? res.user : undefined;
    });
  }

  public currentUser: User | null | undefined;
  @Output()
  public toggleSidenav = new EventEmitter<void>();

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
