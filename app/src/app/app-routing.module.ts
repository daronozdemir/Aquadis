import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { ActivitiesComponent }      from './components/activites/activities.component';
import { ActivityDetailComponent }  from './components/activity-detail/activity-detail.component';
import {LoginComponent} from "./components/login/login.component";

import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {EditActivityComponent} from "./components/edit-activity/edit-activity.component";
import {AddActivityComponent} from "./components/add-activity/add-activity.component";
import {ManageUserComponent} from "./components/manage-user/manage-user.component";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ActivityDetailComponent },
  { path: 'edit/:id', component: EditActivityComponent },
  { path: 'organize', component: AddActivityComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'login', component: LoginComponent},

  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'createUser', component: CreateUserComponent},
  { path: 'account', component: ManageUserComponent},


  {path: '404', component: LoginComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
