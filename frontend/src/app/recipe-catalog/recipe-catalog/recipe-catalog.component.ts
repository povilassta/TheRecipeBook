import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
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
    private componentCommunicationService: ComponentCommunicationService,
    private router: Router
  ) {
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.page = Number(params.get('page')) || 1;
    });
    this.componentCommunicationService.updateRecipesCalled$.subscribe(
      (pageNum) => {
        this.page = pageNum;
        this.updateRecipies();
      }
    );
  }

  public sortBy = 'recent';
  public page = 0;
  public recipes: Recipe[] = [];
  public value: number = 60;

  public updateRecipies(): void {
    this.recipeService
      .getRecipes(this.page, this.sortBy)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.router.navigate([], {
      relativeTo: this._Activatedroute,
      queryParams: {
        page: this.page,
        order: this.sortBy,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }

  public ngOnInit(): void {
    this.recipeService
      .getRecipes(this.page, this.sortBy)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }
}
