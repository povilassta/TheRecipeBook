import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, of } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { FilterModel } from 'src/app/models/filter.model';
import { RecipeResponse } from 'src/app/models/recipeResponse.model';
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
export class RecipeCatalogComponent {
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
    // Retrieve query info from route query
    this._Activatedroute.queryParamMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.appStateService.setState({
          pageNumber: Number(params.get('page')) || 1,
        });
        this.filterObj =
          this.codingService.decode(params.get('filter')) || this.filterObj;
      });

    // Subscription to page state
    this.appStateService
      .select('pageNumber')
      .pipe(untilDestroyed(this))
      .subscribe((pn) => {
        this.page = pn;
      });

    // On language change update sort options
    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.setSortOptions();
    });

    // Recipe and Category observables
    this.categories$ = this.categoryService.getCategories();
    this.recipeResponse$ = this.updateRecipes(this.page);

    // Set sort options
    this.setSortOptions();
  }

  public filterObj: FilterModel = {
    sort: 'recent',
    categories: [],
    time: 60,
  };
  public page = 1;
  public count = 0;
  public recipeResponse$: Observable<RecipeResponse>;
  public categories$: Observable<Category[]>;
  public sortOptions: { label: string; value: string }[] = [];

  private setSortOptions(): void {
    this.translate
      .get(['catalog.sortOptions'])
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
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

  public updateRecipes(pageNum: number): Observable<RecipeResponse> {
    this.appStateService.setState({ pageNumber: pageNum });
    this.router.navigate([], {
      relativeTo: this._Activatedroute,
      queryParams: {
        page: pageNum,
        filter: this.codingService.encode(this.filterObj),
      },
      skipLocationChange: false,
    });
    return this.recipeService.getRecipes(pageNum - 1, this.filterObj).pipe(
      catchError((err) => {
        const spinnerEl = document.getElementById('spinner');
        if (spinnerEl) spinnerEl.style.display = 'none';
        this.translate
          .get(['errors.500', 'errors.closeBtn'])
          .pipe(untilDestroyed(this))
          .subscribe((res: any) => {
            this._snackBar.open(res['errors.500'], res['errors.closeBtn']);
          });
        return of();
      })
    );
  }
}
