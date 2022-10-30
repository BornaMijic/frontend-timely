import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {WorkSession} from "./work-session.model";

@Injectable({
  providedIn: 'root'
})
export class WorkSessionService {
  countingStart: Date | null = null;
  countingStartSubject: Subject<Date> = new Subject<Date>();
  countingStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  workSessions: WorkSession[] =  [];
  workSessionsSubject: Subject<WorkSession[]> = new Subject<WorkSession[]>();

  constructor() { }

  setStartCounting(startDate: Date | null) {
    if(startDate != null) {
      this.countingStart = startDate;
      this.countingStartSubject.next(this.countingStart);
      this.countingStateSubject.next(true)
    }
  }

  addWorkSessions(name: string, endDate: Date) {
    if(this.countingStart != null) {
      let workSession: WorkSession = new WorkSession(name, this.countingStart, endDate);
      this.countingStart = null;
      this.countingStartSubject = new Subject<Date>();
      this.countingStateSubject.next(false);
      this.workSessions.push(workSession);
      console.log(this.workSessions)
      this.workSessionsSubject.next(this.workSessions);

    }
  }
}
