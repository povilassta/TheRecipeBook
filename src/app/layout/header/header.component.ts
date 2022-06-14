import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private componentCommunicationService: ComponentCommunicationService
  ) {
    componentCommunicationService.updateHeaderCalled$
      .pipe(untilDestroyed(this))
      .subscribe(
        () => (this.currentUser = localStorage.getItem('email') || '')
      );
  }

  public currentUser: string = localStorage.getItem('email') || '';

  public logout(): void {
    localStorage.removeItem('email');
    this.currentUser = '';
  }

  ngOnInit(): void {}
}
