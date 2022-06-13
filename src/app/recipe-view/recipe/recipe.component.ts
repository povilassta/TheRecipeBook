import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  public tags: string[] = ['chicken', 'lunch', 'fast'];

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
