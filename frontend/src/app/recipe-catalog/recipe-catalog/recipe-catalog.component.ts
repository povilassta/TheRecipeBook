import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.sass'],
})
export class RecipeCatalogComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  // Mock data of the same delicious burger
  public recipes: Recipe[] = [];
  public value: number = 60;
  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: this.recipes.length,
  };

  public ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
