import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ActivitySearchComponent } from '../activity-search/activity-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
// @ts-ignore
import { ACTIVITIES } from '../../mock-activities';
import { ActivityService } from '../../service/activity.service/activity.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(async(() => {
    heroService = jasmine.createSpyObj('ActivityService', ['getActivities']);
    getHeroesSpy = heroService.getActivities.and.returnValue( of(ACTIVITIES) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        ActivitySearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivityService, useValue: heroService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Heroes');
  });

  it('should call heroService', async(() => {
    expect(getHeroesSpy.calls.any()).toBe(true);
    }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

});
