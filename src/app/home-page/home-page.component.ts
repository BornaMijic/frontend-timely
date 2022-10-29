import { Component, OnInit } from '@angular/core';
import {WorkSessionService} from "./work-session.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  start: boolean = false;

  constructor(private workSessionService: WorkSessionService) { }

  startCounting() {
    this.start = true;
    this.workSessionService.setStartCounting(new Date());
  }

}
