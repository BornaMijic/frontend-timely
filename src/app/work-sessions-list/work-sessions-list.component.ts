import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkSession } from '../home-page/work-session.model';
import { Subscription } from 'rxjs';
import { WorkSessionService } from '../home-page/work-session.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-work-sessions-list',
  templateUrl: './work-sessions-list.component.html',
  styleUrls: ['./work-sessions-list.component.css'],
})
export class WorkSessionsListComponent implements OnInit, OnDestroy {
  workSessions: WorkSession[] = [];
  coutingStart: Date | null = null;
  edit: boolean = false;
  selectedWorkSessionForEdit: string = '';
  name: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  error: string = '';
  page: number = 1;
  readonly DATE_FORMAT: string = 'dd-MM-yyyy hh:mm';
  private subscription: Subscription = new Subscription();

  constructor(private workSessionService: WorkSessionService) {}

  ngOnInit(): void {
    let subscription = this.workSessionService
      .getWorkSessions()
      .subscribe((workSessions: WorkSession[]) => {
        this.workSessions = workSessions;
        this.workSessionService.setWorkSessions(this.workSessions);
      });

    this.subscription.add(subscription);

    subscription = this.workSessionService.workSessionsSubject.subscribe(
      (workSessions: WorkSession[]) => {
        this.workSessions = workSessions;
      }
    );

    this.subscription.add(subscription);

    subscription = this.workSessionService.countingStartSubject.subscribe(
      (startDate: Date | null) => {
        this.coutingStart = startDate;
      }
    );
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDuration(endDate: Date, startDate: Date): string {
    let timeDiff: number =
      new Date(endDate).getTime() - new Date(startDate).getTime();
    if (timeDiff == 0) {
      return '00:00:00';
    }
    let seconds: string | number = Math.floor((timeDiff / 1000) % 60);
    let minutes: string | number = Math.floor(timeDiff / (1000 * 60));

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return +minutes + ':' + seconds;
  }

  setForEdit(workSession: WorkSession) {
    if (workSession.id) {
      this.edit = true;
      this.selectedWorkSessionForEdit = workSession.id;
      this.name = workSession.name;
      this.startDate = workSession.startDate;
      this.endDate = workSession.endDate;
    }
  }

  closeEdit() {
    this.edit = false;
    this.selectedWorkSessionForEdit = '';
    this.error = '';
  }

  updateWorkSession(id: string | undefined) {
    if (
      new Date(this.startDate.toString()) > new Date(this.endDate.toString())
    ) {
      this.error = 'Stop date cannot be before start date';
      return;
    }

    if (id) {
      let workSession = new WorkSession(
        this.name,
        new Date(new Date(this.startDate).toLocaleString('en', {timeZone: 'Europe/Berlin'})),
        new Date(new Date(this.endDate).toLocaleString('en', {timeZone: 'Europe/Berlin'})),
        id
      );
      let subscription = this.workSessionService
        .updateWorkSession(workSession)
        .subscribe((workSession: WorkSession) => {
          this.error = '';
          this.workSessionService.updateWorkSessionSuccess(workSession);
          this.name = '';
          this.startDate = new Date();
          this.endDate = new Date();
          this.edit = false;
          this.selectedWorkSessionForEdit = '';
        });
      this.subscription.add(subscription);
    } else {
      this.error = 'Error occurred';
    }
  }

  deleteCurrentWorkSession() {
    this.workSessionService.stopCountingAndDelete(null);
  }

  deleteWorkSession(id: string | undefined) {
    if (id) {
      let subscription = this.workSessionService
        .deleteWorkSession(id)
        .subscribe({
          next: () => {
            this.workSessionService.deleteWorkSessionSuccess(id);
            this.error = '';
          },
          error: () => (this.error = 'Deleting was unsuccessful'),
        });

      this.subscription.add(subscription);
    } else {
      this.error = 'Error occurred';
    }
  }

  changePage(event: any) {
    this.page = event;
  }

  export() {
    let table = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb, "work_sessions_excel")
  }
}
