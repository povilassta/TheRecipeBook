import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipes: Recipe[] = [];
  private BASE_URL: string = `http://localhost:3000/api/recipes/`;

  constructor(private http: HttpClient) {}

  public getRecipes(page: number): Observable<any> {
    let params = new HttpParams().set('page', page);
    return this.http.get(this.BASE_URL, { params }).pipe(
      tap({
        next: (res: any) => {
          this.recipes = res;
        },
      })
    );
  }

  public getCount(): Observable<any> {
    return this.http.get(`${this.BASE_URL}count`);
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.BASE_URL}/${id}`);
  }
}
