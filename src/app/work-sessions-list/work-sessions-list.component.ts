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
  private subscription: Subscription = new Subscription()

  constructor(private workSessionService: WorkSessionService) { }

  ngOnInit(): void {
    let subscription = this.workSessionService.getWorkSessions().subscribe(
      (workSessions: WorkSession[]) => {
        this.workSessions = workSessions
      })

    this.subscription.add(subscription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
