import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { ActivityDetailComponent }  from './components/activity-detail/activity-detail.component';
import { ActivitiesComponent }      from './components/activites/activities.component';
import { ActivitySearchComponent }  from './components/activity-search/activity-search.component';
import { LogComponent }    from './log/log.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {UserActivitiesComponent} from "./components/user-activities/user-activities.component";
import { ManageUserComponent } from './components/manage-user/manage-user.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
   // HttpClientInMemoryWebApiModule.forRoot(
   //   InMemoryDataService, { dataEncapsulation: false }
  //  )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ActivitiesComponent,
    ActivityDetailComponent,
    LogComponent,
    ActivitySearchComponent,
    NavigationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreateUserComponent,
    AddActivityComponent,
    EditActivityComponent,

    UserActivitiesComponent,

    ManageUserComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
