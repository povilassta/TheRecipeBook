import { Injectable } from '@angular/core';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class CodingService {
  constructor() {}

  public encode(filterObj: FilterModel): string {
    return btoa(JSON.stringify(filterObj));
  }

  public decode(string: string | null): FilterModel | null {
    if (string) return JSON.parse(atob(string));
    else return null;
  }
}
