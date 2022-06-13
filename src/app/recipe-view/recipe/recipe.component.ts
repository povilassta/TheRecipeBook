import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SharedService } from 'src/app/services/shared.service';

@UntilDestroy()
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService
  ) {
    sharedService.updateUserCalled$
      .pipe(untilDestroyed(this))
      .subscribe(
        () => (this.currentUser = localStorage.getItem('email') || '')
      );
  }

  public tags: string[] = ['chicken', 'lunch', 'fast'];
  public currentUser: string = localStorage.getItem('email') || '';

  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);

    if (hasClass) {
      this.renderer.removeClass(event.target, className);
    } else {
      this.renderer.addClass(event.target, className);
    }
  }

  ngOnInit(): void {}
}
