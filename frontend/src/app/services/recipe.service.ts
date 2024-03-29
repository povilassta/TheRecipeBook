import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FilterModel } from '../models/filter.model';
import { Recipe } from '../models/recipe.model';
import { RecipePost } from '../models/recipePost.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public BASE_URL: string = `/api/recipes/`;

  constructor(private http: HttpClient) {}

  public getRecipes(page: number, filterObj: FilterModel): Observable<any> {
    return this.http.post(this.BASE_URL, { ...filterObj, page });
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.BASE_URL}${id}`);
  }

  public putRecipe(
    files: File[],
    data: RecipePost,
    recipeId: string,
    markedForDeletion: string[]
  ): Observable<any> {
    const formData = new FormData();
    for (let file of files) {
      formData.append('images', file);
    }
    formData.append('data', JSON.stringify(data));
    formData.append('markedForDeletion', JSON.stringify(markedForDeletion));
    return this.http.put(`${this.BASE_URL}${recipeId}`, formData);
  }

  public postRecipe(files: File[], data: RecipePost): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    for (let file of files) {
      formData.append('images', file);
    }
    return this.http.post(`${this.BASE_URL}create`, formData);
  }

  public deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${recipeId}`);
  }

  public likeRecipe(recipeId: string): Observable<any> {
    return this.http.patch(`${this.BASE_URL}${recipeId}/like`, {});
  }
}
