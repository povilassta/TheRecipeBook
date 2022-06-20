import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { FilterModel } from 'src/app/models/filter.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeParams } from 'src/app/models/recipeParams.model';
import { CategoryService } from 'src/app/services/category.service';
import { CodingService } from 'src/app/services/coding.service';
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
    private router: Router,
    private categoryService: CategoryService,
    private codingService: CodingService
  ) {
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.page = Number(params.get('page')) || 1;
      this.filterObj =
        this.codingService.decode(params.get('filter')) || this.filterObj;
    });
    this.componentCommunicationService.updateRecipesCalled$.subscribe(
      (pageNum) => {
        this.page = pageNum;
        this.updateRecipes();
      }
    );
  }

  public filterObj: FilterModel = {
    sort: 'recent',
    categories: [],
    time: 60,
  };
  public page = 0;

  public recipes: Recipe[] = [];
  public categories: Category[] = [];

  public updateRecipes(): void {
    this.recipeService
      .getRecipes(this.page, this.filterObj)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.router.navigate([], {
      relativeTo: this._Activatedroute,
      queryParams: {
        page: this.page,
        filter: this.codingService.encode(this.filterObj),
      },
      skipLocationChange: false,
    });
  }

  public ngOnInit(): void {
    this.recipeService
      .getRecipes(this.page, this.filterObj)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
