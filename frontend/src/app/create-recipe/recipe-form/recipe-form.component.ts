import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CategoryService } from 'src/app/services/category.service';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';
import { RecipeService } from 'src/app/services/recipe.service';

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
    private componentCommunicationService: ComponentCommunicationService
  ) {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.recipeId = params.get('recipeId') || '';
      this.isEditing = this.recipeId ? true : false;
      this.isLoading = true;
    });
    this.componentCommunicationService.unselectInitialFileCalled$.subscribe(
      (index: number) => {
        this.markedForDeletion.push(this.initialPreviews[index].slice(16));
        this.initialPreviews.splice(index, 1);
      }
    );
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
    this.categoryService.getCategories().subscribe((categories) => {
      this.allCategories = categories;
    });
    if (this.recipeId) {
      this.recipeService.getRecipe(this.recipeId).subscribe((data: Recipe) => {
        this.recipe = data;
        this.setInitialValues();
        this.isLoading = false;
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
      this.recipeService.uploadPictures(this.files).subscribe((res) => {
        this.recipeService
          .postRecipe({
            title: title as string,
            categories: categories as string[],
            timeMinutes: timeMinutes as number,
            ingredients: this.ingredients,
            instructions: this.instructions,
            imageUrls: res.urls,
          })
          .subscribe(() => {
            this.router.navigateByUrl('/recipes');
          });
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
}
