import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentCommunicationService {
  constructor() {}

  private updateUserCallSource = new Subject<void>();
  public updateUserCalled$ = this.updateUserCallSource.asObservable();
  public callUpdateUser(): void {
    this.updateUserCallSource.next();
  }

  private updateRecipesCallSource = new Subject<number>();
  public updateRecipesCalled$ = this.updateRecipesCallSource.asObservable();
  public callUpdateRecipes(pageNum: number): void {
    this.updateRecipesCallSource.next(pageNum);
  }

  private unselectFileCallSource = new Subject<number>();
  public unselectFileCalled$ = this.unselectFileCallSource.asObservable();
  public callUnselectFile(index: number): void {
    this.unselectFileCallSource.next(index);
  }
}
