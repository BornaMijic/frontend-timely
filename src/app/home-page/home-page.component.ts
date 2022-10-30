import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkSessionService} from "./work-session.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {WorkSession} from "./work-session.model";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{
  startState: boolean = false;
  private subscription: Subscription = new Subscription()
  workSessions: WorkSession[] = []

  constructor(private workSessionService: WorkSessionService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    let subscription = this.workSessionService.countingStateSubject.subscribe(
      (state: boolean) => {
        this.startState = state;
      }
    )

    this.subscription.add(subscription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  startCounting() {
    this.startState = true;
    this.workSessionService.setStartCounting(new Date());
  }

  stopCounting() {
    const dialog = new MatDialogConfig();
    dialog.width = "400px";
    dialog.height = "300px";

    const modalDialog = this.matDialog.open(DialogComponent, dialog)
  }

}
