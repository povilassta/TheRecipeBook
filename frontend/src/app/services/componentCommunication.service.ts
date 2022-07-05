import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentCommunicationService {
  constructor() {}

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

  private unselectInitialFileCallSource = new Subject<number>();
  public unselectInitialFileCalled$ =
    this.unselectInitialFileCallSource.asObservable();
  public callUnselectInitialFile(index: number): void {
    this.unselectInitialFileCallSource.next(index);
  }
}
