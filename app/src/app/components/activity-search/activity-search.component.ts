import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Activity } from '../../models/Activity';
import { ActivityService } from '../../service/activity.service/activity.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './activity-search.component.html',
  styleUrls: [ './activity-search.component.css' ]
})
export class ActivitySearchComponent implements OnInit {
  activities$: Observable<Activity[]>;
  private searchTerms = new Subject<string>();

  constructor(private activityService: ActivityService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.activities$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.activityService.searchActivities(term)),
    );
  }
}
