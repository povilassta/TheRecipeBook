import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeParams } from 'src/app/models/recipeParams.model';
import { CategoryService } from 'src/app/services/category.service';
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
    private categoryService: CategoryService
  ) {
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.page = Number(params.get('page')) || 1;
      this.sortBy = params.get('order') || 'recent';
      this.categoryFilter = params.get('filter')?.split(',') || [];
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
  public categories: Category[] = [];
  public categoryFilter: string[] = [];
  private params: RecipeParams | undefined;

  public updateRecipies(): void {
    this.params = this.paramBuilder(
      this.page,
      this.sortBy,
      this.categoryFilter
    );
    this.recipeService
      .getRecipes(this.page, this.sortBy, this.categoryFilter.join(','))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.router.navigate([], {
      relativeTo: this._Activatedroute,
      queryParams: this.paramBuilder(
        this.page,
        this.sortBy,
        this.categoryFilter
      ),
      skipLocationChange: false,
    });
  }

  public ngOnInit(): void {
    this.recipeService
      .getRecipes(this.page, this.sortBy, this.categoryFilter.join(','))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  public paramBuilder(
    page: number,
    sortBy: string,
    categoryFilter: string[]
  ): RecipeParams {
    let obj: RecipeParams = {
      page: page,
      order: sortBy,
      filter: categoryFilter.join(','),
    };
    Object.keys(obj).forEach((key) => {
      if (!obj[key as keyof RecipeParams]) {
        delete obj[key as keyof RecipeParams];
      }
    });

    return obj;
  }
}
