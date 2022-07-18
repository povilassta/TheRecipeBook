import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  public addHours(numOfHours: number, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date;
  }
}
