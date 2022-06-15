import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass'],
})
export class RecipeCardComponent implements OnInit {
  constructor() {}
  @Input()
  public recipe: Recipe | undefined;

  ngOnInit(): void {}
}
