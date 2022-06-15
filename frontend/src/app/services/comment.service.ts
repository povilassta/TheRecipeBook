import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  private BASE_URL = 'http://localhost:3000/recipes/';

  public getComments(recipeId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.BASE_URL}/${recipeId}/comments`);
  }
}
