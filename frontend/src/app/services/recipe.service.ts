import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeParams } from '../models/recipeParams.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipes: Recipe[] = [];
  private BASE_URL: string = `http://localhost:3000/api/recipes/`;

  constructor(private http: HttpClient) {}

  public getRecipes(
    page: number,
    order: string,
    filter: string,
    time: number
  ): Observable<any> {
    const params = this.paramBuiler(page, order, filter, time);
    return this.http.get(this.BASE_URL, { params }).pipe(
      tap({
        next: (res: any) => {
          this.recipes = res;
        },
      })
    );
  }

  private paramBuiler(
    page: number,
    order: string,
    filter: string,
    time: number
  ): HttpParams {
    let obj: RecipeParams = { page, order, filter, time };
    return Object.keys(obj).reduce(
      (params, key) =>
        obj[key as keyof RecipeParams]
          ? params.append(key, obj[key as keyof RecipeParams])
          : params,
      new HttpParams()
    );
  }

  public getCount(filter: string, time: number): Observable<any> {
    const params = this.paramBuiler(1, '', filter, time);
    return this.http.get(`${this.BASE_URL}count`, { params });
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.BASE_URL}/${id}`);
  }
}
