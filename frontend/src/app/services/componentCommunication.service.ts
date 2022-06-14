import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentCommunicationService {
  constructor() {}

  private updateHeaderCallSource = new Subject<void>();

  public updateHeaderCalled$ = this.updateHeaderCallSource.asObservable();

  public callUpdateHeader(): void {
    this.updateHeaderCallSource.next();
  }
}
