import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.sass'],
})
export class RecipeCatalogComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private _Activatedroute: ActivatedRoute
  ) {
    this._Activatedroute.queryParamMap.subscribe((params) => {
      console.log(params.get('page'));
      this.page = Number(params.get('page')) || 1;
    });
  }

  public page = 0;
  public recipes: Recipe[] = [];
  public value: number = 60;
  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: this.recipes.length,
  };

  public ngOnInit(): void {
    this.recipeService.getRecipes(this.page).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
