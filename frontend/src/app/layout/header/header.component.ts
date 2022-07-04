import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private componentCommunicationService: ComponentCommunicationService,
    private authService: AuthService
  ) {
    componentCommunicationService.updateUserCalled$
      .pipe(untilDestroyed(this))
      .subscribe(
        () => (this.currentUser = localStorage.getItem('username') || '')
      );
  }

  public currentUser: string = localStorage.getItem('username') || '';
  @Output()
  public toggleSidenav = new EventEmitter<void>();

  public logout(): void {
    this.authService.logout();
    this.currentUser = '';
    this.componentCommunicationService.callUpdateUser();
  }

  ngOnInit(): void {}
}
