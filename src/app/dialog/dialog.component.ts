import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {WorkSessionService} from "../home-page/work-session.service";
import {WorkSession} from "../home-page/work-session.model";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

  constructor(private workSessionService: WorkSessionService,private dialog: MatDialogRef<DialogComponent>) { }


  addProject(name: string) {
    this.workSessionService.addWorkSessions(name, new Date()).subscribe(
      {
        next: (workSession: WorkSession) => {
          this.workSessionService.addWorkSessionsIfSuccess(workSession);
        },
        error: () => {

        }
      }
    );
    this.dialog.close();
  }

  closeDialog(){
    this.dialog.close();
  }

}
