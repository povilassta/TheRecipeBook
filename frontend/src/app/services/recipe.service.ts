import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipes: Recipe[] = [];
  private BASE_URL: string = `http://localhost:3000/recipes/`;

  constructor(private http: HttpClient) {}

  public getRecipes(): Observable<any> {
    return this.http.get(this.BASE_URL).pipe(
      tap({
        next: (res: any) => {
          this.recipes = res;
        },
      })
    );
  }
}
