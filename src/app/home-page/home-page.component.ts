import { Component} from '@angular/core';
import {WorkSessionService} from "./work-session.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  start: boolean = false;

  constructor(private workSessionService: WorkSessionService, private matDialog: MatDialog) { }

  startCounting() {
    this.start = true;
    this.workSessionService.setStartCounting(new Date());
  }

  stopCounting() {
    const dialog = new MatDialogConfig();
    dialog.width = "400px";
    dialog.height = "300px";

    const modalDialog = this.matDialog.open(DialogComponent, dialog)
  }

}
