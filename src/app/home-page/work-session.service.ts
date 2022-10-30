import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { WorkSession } from './work-session.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WorkSessionService {
  countingStart: Date | null = null;
  countingStartSubject: Subject<Date | null> = new Subject<Date | null>();
  countingStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  workSessions: WorkSession[] = [];
  workSessionsSubject: Subject<WorkSession[]> = new Subject<WorkSession[]>();

  constructor(private dataStorageService: DataStorageService) {}

  getWorkSessions(): Observable<WorkSession[]> {
    return this.dataStorageService.getWorkSessions();
  }

  setWorkSessions(workSessions: WorkSession[]) {
    this.workSessions = workSessions;
    this.workSessionsSubject.next(this.workSessions);
  }

  setStartCounting(startDate: Date | null) {
    if (startDate != null) {
      this.countingStart = startDate;
      this.countingStartSubject.next(this.countingStart);
      this.countingStateSubject.next(true);
    }
  }

  addWorkSessions(name: string, endDate: Date): Observable<WorkSession> {
    if (this.countingStart != null) {
      let workSession: WorkSession = new WorkSession(
        name,
        this.countingStart,
        endDate
      );
      return this.dataStorageService.addWorkSession(workSession);
    }
    return throwError(() => new Error('Error occurred'));
  }

  addWorkSessionsIfSuccess(workSession: WorkSession) {
    if (this.countingStart != null) {
      this.countingStart = null;
      this.countingStartSubject.next(null);
      this.countingStateSubject.next(false);
      this.workSessions.push(workSession);
      this.workSessionsSubject.next(this.workSessions);
    }
  }

  deleteWorkSession(id: string): Observable<any> {
    return this.dataStorageService.deleteWorkSession(id);
  }

  deleteWorkSessionSuccess(id: string) {
    this.workSessions = this.workSessions.filter(
      (workSession: WorkSession) => workSession.id != id
    );
    this.workSessionsSubject.next(this.workSessions);
  }

  stopCountingAndDelete(date: null) {
    this.countingStartSubject.next(null);
    this.countingStart = null;
    this.countingStateSubject.next(false);
  }

  updateWorkSession(workSession: WorkSession): Observable<WorkSession> {
    return this.dataStorageService.updateWorkSession(workSession);
  }

  updateWorkSessionSuccess(workSession: WorkSession) {
    let index = this.workSessions.findIndex(
      (workSessionItem) => workSessionItem.id == workSession.id
    );
    this.workSessions[index] = workSession;
    this.workSessionsSubject.next(this.workSessions);
  }
}
