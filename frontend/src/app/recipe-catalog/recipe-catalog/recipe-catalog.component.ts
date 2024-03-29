import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/models/category.model';
import { FilterModel } from 'src/app/models/filter.model';
import { Recipe } from 'src/app/models/recipe.model';
import { AppStateService } from 'src/app/services/appState.service';
import { CategoryService } from 'src/app/services/category.service';
import { CodingService } from 'src/app/services/coding.service';
import { RecipeService } from 'src/app/services/recipe.service';

@UntilDestroy()
@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.sass'],
})
export class RecipeCatalogComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private codingService: CodingService,
    private _snackBar: MatSnackBar,
    private appStateService: AppStateService,
    private translate: TranslateService
  ) {
    this._Activatedroute.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.appStateService.setState({
          pageNumber: Number(params.get('page')) || 1,
        });
        this.filterObj =
          this.codingService.decode(params.get('filter')) || this.filterObj;
      });

    this.appStateService
      .select('pageNumber')
      .pipe(untilDestroyed(this))
      .subscribe((pn) => {
        this.page = pn;
      });

    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.setSortOptions();
    });
  }

  public filterObj: FilterModel = {
    sort: 'recent',
    categories: [],
    time: 60,
  };
  public page = 1;
  public count = 0;
  public recipes: Recipe[] = [];
  public categories: Category[] = [];
  public isLoading = true;
  public sortOptions: { label: string; value: string }[] = [];

  private setSortOptions(): void {
    this.translate.get(['catalog.sortOptions']).subscribe((res: any) => {
      this.sortOptions = [
        {
          label: res['catalog.sortOptions'].recent,
          value: 'recent',
        },
        {
          label: res['catalog.sortOptions'].oldest,
          value: 'oldest',
        },
        {
          label: res['catalog.sortOptions'].popular,
          value: 'popular',
        },
      ];
    });
  }

  public updateRecipes(pageNum: number): void {
    this.appStateService.setState({ pageNumber: pageNum });
    this.recipeService
      .getRecipes(pageNum - 1, this.filterObj)
      .subscribe((res) => {
        this.recipes = res.recipes;
        this.count = res.count;
      });
    this.router.navigate([], {
      relativeTo: this._Activatedroute,
      queryParams: {
        page: pageNum,
        filter: this.codingService.encode(this.filterObj),
      },
      skipLocationChange: false,
    });
  }

  public ngOnInit(): void {
    this.setSortOptions();
    this.recipeService.getRecipes(this.page - 1, this.filterObj).subscribe({
      next: (res) => {
        this.recipes = res.recipes;
        this.count = res.count;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;

        this.translate
          .get(['errors.500', 'errors.refreshBtn'])
          .subscribe((res: any) => {
            console.log(res);
            this._snackBar.open(res['errors.500'], res['errors.refreshBtn']);
          });
        this._snackBar._openedSnackBarRef?.afterDismissed().subscribe(() => {
          window.location.reload();
        });
      },
    });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
