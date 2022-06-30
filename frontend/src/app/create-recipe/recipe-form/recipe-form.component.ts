import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CategoryService } from 'src/app/services/category.service';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';
import { RecipeService } from 'src/app/services/recipe.service';

@UntilDestroy()
@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.sass'],
})
export class RecipeFormComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private componentCommunicationService: ComponentCommunicationService,
    private _snackBar: MatSnackBar
  ) {
    this._Activatedroute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.recipeId = params.get('recipeId') || '';
        this.isEditing = this.recipeId ? true : false;
      });
    this.componentCommunicationService.unselectInitialFileCalled$
      .pipe(untilDestroyed(this))
      .subscribe((index: number) => {
        this.markedForDeletion.push(this.initialPreviews[index].slice(16));
        this.initialPreviews.splice(index, 1);
      });
  }

  public recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categories: new FormControl<string[]>([], [Validators.required]),
    timeMinutes: new FormControl<number>(15, [Validators.required]),
    currentIngredient: new FormControl(''),
    currentInstruction: new FormControl(''),
  });

  public files: File[] = [];
  public ingredients: string[] = [];
  public instructions: string[] = [];

  public allCategories: Category[] = [];

  // Editing variables
  public isEditing = false;
  public recipeId = '';
  public recipe: Recipe | undefined;
  public isLoading = false;
  public initialPreviews: string[] = [];
  public markedForDeletion: string[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;
      },
      error: (error: any) => {
        this.openSnackBar('Refresh');
      },
    });
    if (this.recipeId) {
      this.recipeService.getRecipe(this.recipeId).subscribe({
        next: (data: Recipe) => {
          this.recipe = data;
          this.setInitialValues();
          this.isLoading = false;
        },
        error: (error: any) => {
          this.openSnackBar('Refresh');
        },
      });
    }
  }

  setInitialValues(): void {
    this.recipeForm.setValue({
      title: this.recipe?.title || '',
      categories: this.recipe?.categories.map((c) => c._id) || null,
      timeMinutes: this.recipe?.timeMinutes || null,
      currentIngredient: '',
      currentInstruction: '',
    });
    this.ingredients = this.recipe?.ingredients || [];
    this.instructions = this.recipe?.instructions || [];
    this.initialPreviews =
      this.recipe?.imageUrls.map((url) => '/images/recipes/' + url) || [];
  }

  onSubmit(): void {
    const { title, categories, timeMinutes } = this.recipeForm.value;
    if (!this.isEditing) {
      this.recipeService.uploadPictures(this.files).subscribe({
        next: (res) => {
          this.recipeService
            .postRecipe({
              title: title as string,
              categories: categories as string[],
              timeMinutes: timeMinutes as number,
              ingredients: this.ingredients,
              instructions: this.instructions,
              imageUrls: res.urls,
            })
            .subscribe({
              next: () => {
                this.router.navigateByUrl('/recipes');
              },
              error: (error: any) => {
                this.openSnackBar('Close');
              },
            });
        },
        error: (error: any) => {
          this.openSnackBar('Close');
        },
      });
    } else {
      const trimmedInitialUrls = this.initialPreviews.map((url) =>
        url.slice(16)
      );
      if (this.files) {
        this.recipeService.uploadPictures(this.files).subscribe((res) => {
          this.recipeService
            .putRecipe(
              {
                title: title as string,
                categories: categories as string[],
                timeMinutes: timeMinutes as number,
                ingredients: this.ingredients,
                instructions: this.instructions,
                imageUrls: [...trimmedInitialUrls, ...res.urls],
              },
              this.recipeId,
              this.markedForDeletion
            )
            .subscribe(() => {
              this.router.navigateByUrl('/recipes');
            });
        });
      } else {
        this.recipeService
          .putRecipe(
            {
              title: title as string,
              categories: categories as string[],
              timeMinutes: timeMinutes as number,
              ingredients: this.ingredients,
              instructions: this.instructions,
              imageUrls: trimmedInitialUrls,
            },
            this.recipeId,
            this.markedForDeletion
          )
          .subscribe(() => {
            this.router.navigateByUrl('/recipes');
          });
      }
    }
  }

  addIngredient(): void {
    if (this.recipeForm.value.currentIngredient) {
      this.ingredients.push(this.recipeForm.value.currentIngredient);
      this.recipeForm.controls['currentIngredient'].reset();
    }
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    console.log(this.ingredients);
  }

  addInstruction(): void {
    if (this.recipeForm.value.currentInstruction) {
      this.instructions.push(this.recipeForm.value.currentInstruction);
      this.recipeForm.controls['currentInstruction'].reset();
    }
  }

  removeInstruction(index: number): void {
    this.instructions.splice(index, 1);
  }

  filesAdded(event: any): void {
    this.files = event;
  }

  openSnackBar(action: string): void {
    this._snackBar.open(
      'Something went wrong with the server. Please try again in a few minutes',
      action
    );
    if (action === 'Refresh') {
      this._snackBar._openedSnackBarRef?.afterDismissed().subscribe(() => {
        window.location.reload();
      });
    }
  }
}
