import { Component, OnInit } from '@angular/core';

import { Activity } from '../../models/Activity';
import { ActivityService } from '../../service/activity.service/activity.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activites: Activity[];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getActivities()
    .subscribe(activites => this.activites = activites);
  }


  delete(activity: Activity): void {
    this.activites = this.activites.filter(h => h !== activity);
    this.activityService.deleteActivity(activity).subscribe();
  }

}
