import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {WorkSession} from "./work-session.model";
import {HttpClient} from "@angular/common/http";
import {DataStorageService} from "../shared/data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class WorkSessionService {
  countingStart: Date | null = null;
  countingStartSubject: Subject<Date|null> = new Subject<Date|null>();
  countingStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  workSessions: WorkSession[] =  [];
  workSessionsSubject: Subject<WorkSession[]> = new Subject<WorkSession[]>();

  constructor(private dataStorageService: DataStorageService) { }

  getWorkSessions(): Observable<WorkSession[]> {
    return this.dataStorageService.getWorkSessions();
  }

  setWorkSessions(workSessions: WorkSession[]) {
    this.workSessions = workSessions;
    this.workSessionsSubject.next(this.workSessions)
    console.log(this.workSessions)
  }

  setStartCounting(startDate: Date | null) {
    if(startDate != null) {
      this.countingStart = startDate;
      this.countingStartSubject.next(this.countingStart);
      this.countingStateSubject.next(true)
    }
  }

  addWorkSessions(name: string, endDate: Date): Observable<WorkSession> {
    if(this.countingStart != null) {
      let workSession: WorkSession = new WorkSession(name, this.countingStart, endDate);
      return this.dataStorageService.addWorkSession(workSession);
    }
    return throwError(() => new Error("Error occurred"));
  }

  addWorkSessionsIfSuccess(workSession: WorkSession) {
    if(this.countingStart != null) {
      this.countingStart = null;
      this.countingStartSubject.next(null);
      this.countingStateSubject.next(false);
      this.workSessions.push(workSession);
      console.log(this.workSessions)
      this.workSessionsSubject.next(this.workSessions);

    }
  }
}
