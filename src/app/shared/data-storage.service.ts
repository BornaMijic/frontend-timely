import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkSession } from '../home-page/work-session.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  getWorkSessions(): Observable<WorkSession[]> {
    return this.http.get<WorkSession[]>(
      `${environment.backendUrl}work-sessions`
    );
  }

  addWorkSession(workSession: WorkSession): Observable<WorkSession> {
    return this.http.post<WorkSession>(
      `${environment.backendUrl}work-sessions`,
      workSession
    );
  }

  updateWorkSession(workSession: WorkSession): Observable<WorkSession> {
    return this.http.put<WorkSession>(
      `${environment.backendUrl}work-sessions/${workSession.id}`,
      workSession
    );
  }

  deleteWorkSession(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.backendUrl}work-sessions/${id}`
    );
  }
}
