import { Component } from '@angular/core';
import {CheckForUpdateService} from "./check-for-update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private sw: CheckForUpdateService) {
    // check the service worker for updates
    this.sw.checkForUpdates();
    console.log("app component checked for updates")
  }
}
