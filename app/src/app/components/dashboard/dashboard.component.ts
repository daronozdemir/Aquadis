import {Component, OnInit} from '@angular/core';
import {Activity} from '../../models/Activity';
import {ActivityService} from '../../service/activity.service/activity.service';
import {UserService} from "../../service/users.service/users.service";
import {User} from "../../models/User";
import {InviteService} from "../../service/invitations.service/invitations.service";
import {CategoryService} from "../../service/categories.service/categories.service";
import {Category} from "../../models/Category";
import {Invite} from "../../models/Invite";
import {log} from "util";
import * as $ from "jquery";
import {EditActivityService} from "../../edit-activity.service";
import {Observable} from "rxjs";
import {TogglePresentService} from "../../toggle-present.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activities: Activity[] = [];
  attendingActivities: Activity[] = [];
  declinedActivities: Activity[] = [];
  invitedActivities: Activity[] = [];


  // category: Category;

  categories: Category[] = [];

  users: User[] = [];
  invites: Invite[] = [];
  invites_going: Invite[] = [];
  invites_declined: Invite[] = [];
  invites_inv: Invite[] = [];

  constructor(private activityService: ActivityService,
              private inviteService: InviteService,
              private categoryService: CategoryService,
              public userService: UserService,
              protected activityEdit: EditActivityService,
              private togglePresent: TogglePresentService) {
  }

  ngOnInit() {
    this.activityEdit.showOrganizer = false;
    this.getInvites();
    this.getCategories();

    (async () => {
      await this.delay(500);
        (async () => {
          await this.delay(500);
        })();
    })();

    if (this.userService.loggedInUser == null){

    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // --> USERS

  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      for (let user of users) {
        this.users.push(user);
      }
    });
  }

  protected getUser(id: number): User {
    for (let user of this.users) {
      if (user.id === id)
        return user;
    }
  }

  public getUserImg(userId: number) {
    for (let user of this.users){
      if (user.id == userId) {
        return user.avatarUrl;
      }
    }
  }

  // --> CATEGORIES

  private getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      for (let category of categories) {
        this.categories.push(category);
      }
    });
  }

  protected getCategory(fk: number): Category {
    for (let category of this.categories) {
      if (category.id === fk)
        return category;
    }
  }

  public getCategoryIcon(categoryId: number) {
    for (let category of this.categories){
      if (category.id == categoryId) {
        return category.icon;
      }
    }
  }

  public getCategoryImage(categoryId: number) {
    for (let category of this.categories){
      if (category.id == categoryId) {
        return category.image;
      }
    }
  }

  // protected getCategory(fk: number) {
  //   this.categoryService.getCategory(fk)
  //       .subscribe(category =>
  //           this.category = category
  //       );
  //
  //   console.log("Category: " + this.category);
  //
  // }

  // --> INVITES

  private getInvites() {

    this.inviteService.getInvitationsFor(this.userService.loggedInUser.id).subscribe(invites => {
      // --> loop erdoor heen en check ----->
      for (let invite of invites) {
        this.invites.push(invite);

        //Accepted invites
        if (invite.going === true && invite.reacted === true) {
          this.invites_going.push(invite);
        }

        //Declined invites
        if (invite.going === false && invite.reacted === true) {
          this.invites_declined.push(invite);
        }

        //Invitations
        if (invite.reacted === false) {
          this.invites_inv.push(invite);
        }
      }

      if (invites.length != null){
        this.getGoodActivities();
      }


      this.getUsers();
    });
  }

  private getGoodActivities() {
    for (let invite of this.invites_going) {

      this.activityService.getActivity(invite.activityFk).subscribe(activity => {
        this.attendingActivities.push(activity);
      });
    }
    for (let invite of this.invites_declined) {
      this.activityService.getActivity(invite.activityFk).subscribe(activity => {
        this.declinedActivities.push(activity);
      });

    }
    for (let invite of this.invites_inv) {
      this.activityService.getActivity(invite.activityFk).subscribe(activity => {
        this.invitedActivities.push(activity);
        console.log("Invited Activities: " + this.invitedActivities.length);
      });
    }
  }

  reload() {
    this.getInvites();
  }

  setTogglePresent(attending: boolean, isSet: boolean) {
    this.togglePresent.attending = attending;
    this.togglePresent.isSet = isSet
  }
}
