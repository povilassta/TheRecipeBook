import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.sass'],
})
export class RecipeFormComponent implements OnInit {
  constructor() {}

  public currentIngredient = '';
  public currentInstruction = '';

  public ingredients: string[] = [];
  public instructions: string[] = [];

  ngOnInit(): void {}

  addIngredient(): void {
    this.ingredients.push(this.currentIngredient);
    this.currentIngredient = '';
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    console.log(this.ingredients);
  }

  removeInstruction(index: number): void {
    this.instructions.splice(index, 1);
  }

  addInstruction(): void {
    this.instructions.push(this.currentInstruction);
    this.currentInstruction = '';
  }
}
