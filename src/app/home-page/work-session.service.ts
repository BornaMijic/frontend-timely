import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkSessionService {
  countingStart: Date | null = null;
  countingStartSubject: Subject<Date> = new Subject<Date>();

  constructor() { }

  setStartCounting(startDate: Date | null) {
    if(startDate != null) {
      this.countingStart = startDate;
      this.countingStartSubject.next(this.countingStart);
    }

  }
}
