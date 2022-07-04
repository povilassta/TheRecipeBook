import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { FilterModel } from '../models/filter.model';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe.model';
import { RecipePost } from '../models/recipePost.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipes: Recipe[] = [];
  public count = 0;
  private BASE_URL: string = `${environment.baseUrl}/recipes/`;

  constructor(private http: HttpClient) {}

  public getRecipes(page: number, filterObj: FilterModel): Observable<any> {
    return this.http.post(this.BASE_URL, { ...filterObj, page }).pipe(
      tap({
        next: (res: any) => {
          this.recipes = res.recipes;
          this.count = res.count;
        },
      })
    );
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.BASE_URL}/${id}`);
  }

  public putRecipe(
    files: File[],
    data: RecipePost,
    recipeId: string,
    markedForDeletion: string[]
  ): Observable<any> {
    const formData = new FormData();
    for (let file of files) {
      formData.append(file.name, file);
    }
    formData.append('data', JSON.stringify(data));
    formData.append('markedForDeletion', JSON.stringify(markedForDeletion));
    return this.http.put(`${this.BASE_URL}${recipeId}`, formData);
  }

  public postRecipe(files: File[], data: RecipePost): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    for (let file of files) {
      formData.append(file.name, file);
    }
    return this.http.post(`${this.BASE_URL}create`, formData);
  }

  public deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${recipeId}`);
  }
}
