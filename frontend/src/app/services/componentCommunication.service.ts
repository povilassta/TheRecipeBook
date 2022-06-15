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
}
