import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FilterModel } from '../models/filter.model';
import { Recipe } from '../models/recipe.model';
import { RecipeParams } from '../models/recipeParams.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipes: Recipe[] = [];
  private BASE_URL: string = `http://localhost:3000/api/recipes/`;

  constructor(private http: HttpClient) {}

  public getRecipes(page: number, filterObj: FilterModel): Observable<any> {
    return this.http.post(this.BASE_URL, { ...filterObj, page }).pipe(
      tap({
        next: (res: any) => {
          this.recipes = res;
        },
      })
    );
  }

  public getCount(filterObj: FilterModel): Observable<any> {
    return this.http.post(`${this.BASE_URL}count`, { ...filterObj });
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.BASE_URL}/${id}`);
  }
}
