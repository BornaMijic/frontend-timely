import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkSession} from "../home-page/work-session.model";
import {Subscription} from "rxjs";
import {WorkSessionService} from "../home-page/work-session.service";

@Component({
  selector: 'app-work-sessions-list',
  templateUrl: './work-sessions-list.component.html',
  styleUrls: ['./work-sessions-list.component.css']
})
export class WorkSessionsListComponent implements OnInit, OnDestroy {
  workSessions: WorkSession[] = []
  coutingStart: Date | null = null;
  readonly DATE_FORMAT: string = 'dd-MM-yyyy hh:mm';
  private subscription: Subscription = new Subscription()

  constructor(private workSessionService: WorkSessionService) { }

  ngOnInit(): void {
    let subscription = this.workSessionService.getWorkSessions().subscribe(
      (workSessions: WorkSession[]) => {
        this.workSessions = workSessions
        this.workSessionService.setWorkSessions(this.workSessions)
      })

    this.subscription.add(subscription)

    subscription = this.workSessionService.countingStartSubject.subscribe(
      (startDate: Date | null) => {
        this.coutingStart = startDate;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDuration(endDate: Date, startDate: Date): string {
    let timeDiff: number = new Date(endDate).getTime() - new Date(startDate).getTime();
    if(timeDiff == 0) {
      return "00:00:00"
    }
    let seconds: string | number = Math.floor((timeDiff / 1000) % 60);
    let minutes: string | number = Math.floor((timeDiff / (1000 * 60)) % 60);
    let  hours: string | number = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
  }

  deleteCurrentWorkSession() {
    this.workSessionService.stopCountingAndDelete(null);
  }

}
