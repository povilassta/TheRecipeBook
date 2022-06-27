import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
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
    private router: Router
  ) {}

  public recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categories: new FormControl<string[]>([], [Validators.required]),
    timeMinutes: new FormControl<number>(15, [Validators.required]),
    currentIngredient: new FormControl(''),
    currentInstruction: new FormControl(''),
  });

  public currentInstruction = '';

  public files: File[] = [];
  public ingredients: string[] = [];
  public instructions: string[] = [];

  public allCategories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.allCategories = categories;
    });
  }

  onSubmit(): void {
    const { title, categories, timeMinutes } = this.recipeForm.value;
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
