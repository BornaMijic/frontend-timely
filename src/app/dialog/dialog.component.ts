import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkSessionService } from '../home-page/work-session.service';
import { WorkSession } from '../home-page/work-session.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  error: string = '';

  constructor(
    private workSessionService: WorkSessionService,
    private dialog: MatDialogRef<DialogComponent>
  ) {}

  addProject(name: string) {
    this.workSessionService.addWorkSessions(name, new Date()).subscribe({
      next: (workSession: WorkSession) => {
        this.workSessionService.addWorkSessionsIfSuccess(workSession);
        this.error = '';
        this.dialog.close();
      },
      error: () => (this.error = 'Adding was unsuccessful'),
    });
  }

  closeDialog() {
    this.dialog.close();
  }
}
