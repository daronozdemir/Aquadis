import { Component, OnInit } from '@angular/core';
import {EditActivityService} from "../../edit-activity.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../../service/activity.service/activity.service";
import {Location} from "@angular/common";
import {Activity} from "../../models/Activity";
import {InviteService} from "../../service/invitations.service/invitations.service";
import {User} from "../../models/User";
import {UserService} from "../../service/users.service/users.service";
import {Invite} from "../../models/Invite";
import {OrderService} from "../../service/orders.service/orders.service";
import {MenuService} from "../../service/menus.service/menus.service";
import {Menu} from "../../models/Menu";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  activity: Activity;
  attendees: User[] = [];
  atttendingInvites: Invite[] = [];

  invites: Invite[] = [];

  notGoing: User[] = [];
  invited: User[] = [];

  orderedFood: Menu[] = [];
  totalPrice: number = 0;
  users: User[] =[];

  constructor(public editActivity: EditActivityService,
              private route: ActivatedRoute,
              private activityService: ActivityService,
              private location: Location,
              private inviteService: InviteService,
              private userService: UserService,
              private orderService: OrderService,
              private menuService: MenuService) {
  }

  ngOnInit() {

    (async () => {
      this.getActivity();
      this.getUsers();
      await this.delay(1000);
      this.getInvites();
    })();

  }

  /**
   * Set timeout for async requests
   * @param ms - timeout duration
   */
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  private getActivity(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.activityService.getActivity(id)
      .subscribe(activity => this.activity = activity);
  }


  notOrdered: User[]= [];
  /**
   * Get all the invites of the current activity.id
   * Sort all those invites to the right array
   */
  private getInvites() {
    this.inviteService.getInvitationsOf(this.activity.id).subscribe(invites => {
      for (let invite of invites) {
        this.invites = invites;
        if (invite.going === true && invite.reacted === true) {
          //Store the invite
          this.atttendingInvites.push(invite);

          // Get the user (attendee)
          this.attendees.push(this.getUser(invite.userFk));


        }


      }

    });
  }


  getStatus(){
    this.notOrdered = [];;
    this.notGoing = [];
    this.invited = []

    for( let invite of this.invites){
      if (invite.ordered != true || invite.ordered == null){
        this.notOrdered.push(this.getUser(invite.userFk));
      }




      if (invite.going === false && invite.reacted === true){
        // Get the user (rejected)
        this.notGoing.push(this.getUser(invite.userFk));
      }

      if (invite.going === false && invite.reacted === false){
        // Get the user (invited)
        this.invited.push(this.getUser(invite.userFk));
      }
    }
  }

  /**
   * Get a specific user
   * @param id - user id
   */
  protected getUser(id: number): User{
    for (let user of this.users){
      if (user.id === id) return user;
    }
  }

  protected getOrders(){
    let orderedItems: Menu[] = [];
    let sumprices: number = 0;
    for (let invite of this.atttendingInvites){
      this.orderService.getOrdersBy(invite.id).subscribe(orders => {
        for (let order of orders){

          this.menuService.getMenu(order.menuFk).subscribe(item => {
            orderedItems.push(item);
            sumprices += item.price;
          })

        }

      });
    }

    this.orderedFood = orderedItems;
    this.totalPrice = sumprices;
  }


  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      for (let user of users) {
        this.users.push(user);
      }
    });
  }
}
