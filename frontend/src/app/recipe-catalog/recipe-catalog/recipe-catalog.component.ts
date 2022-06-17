import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.sass'],
})
export class RecipeCatalogComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private _Activatedroute: ActivatedRoute,
    private componentCommunicationService: ComponentCommunicationService
  ) {
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.page = Number(params.get('page')) || 1;
    });
    this.componentCommunicationService.updateRecipesCalled$.subscribe(
      (pageNum) => {
        this.page = pageNum;
        this.recipeService.getRecipes(this.page).subscribe((recipes) => {
          this.recipes = recipes;
        });
      }
    );
  }

  public page = 0;
  public recipes: Recipe[] = [];
  public value: number = 60;

  public ngOnInit(): void {
    this.recipeService.getRecipes(this.page).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
