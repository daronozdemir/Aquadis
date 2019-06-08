import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Activity }         from '../../models/Activity';
import { ActivityService }  from '../../service/activity.service/activity.service';
import {UserService} from '../../service/users.service/users.service';
import {InviteService} from '../../service/invitations.service/invitations.service';
import {CategoryService} from '../../service/categories.service/categories.service';
import {OrderService} from '../../service/orders.service/orders.service';
import {User} from '../../models/User';
import {Invite} from '../../models/Invite';
import {Category} from "../../models/Category";
import {async} from "../../../../node_modules/rxjs/internal/scheduler/async";
import {MenuService} from "../../service/menus.service/menus.service";
import {Menu} from "../../models/Menu";
import {Order} from "../../models/Order";

import * as $ from "jquery";

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {EditActivityService} from "../../edit-activity.service";
import {TogglePresentService} from "../../toggle-present.service";

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: [ './activity-detail.component.css' ]
})
export class ActivityDetailComponent implements OnInit {
  activity: Activity;
  category: Category;

  more: number = 99;
  few: number = 5;

  displayAttendees: number = this.few;
  displayInvited: number = this.few;

  countMenus: number = 0;


  attendees: User[] = [];
  notGoing: User[] = [];
  invited: User[] = [];

  users: User[] = [];
  invites: Invite[] = [];

  mainMenu:Menu;
  menus: Menu[] = [];
  subMenus: Menu[] = [];

  personalOrders: Menu[] = [];
  personalPrice: number = 0.00;
  orders: Order[] = [];

  organizer: User;
  attendeesInvites: Invite[] = [];


  searchIsEmpty: boolean = true;

  private searchTerms = new Subject<string>();
  searchedMenus$: Observable<Menu[]>;

  constructor(
    protected activityEdit: EditActivityService,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private location: Location,

    private userService: UserService,
    private inviteService: InviteService,
    private categoryService: CategoryService,
    private menuService: MenuService,
    private orderService: OrderService,
    private togglePresent: TogglePresentService

  ) {}

  isAttending: boolean = false;

  displayAttendingSelection: boolean = true;

  ngOnInit(): void {
    this.isAttending = this.togglePresent.attending;
    this.displayAttendingSelection = this.togglePresent.isSet;

    this.clearSearch();

    (async () => {
      this.getActivity();
      await this.delay(1000);

      this.getUsers();
      this.getInvites();

      (async () => {
        this.getCategory();
        await this.delay(600);
        this.getMenus();


        (async () => {
          await this.delay(1000);
          this.organizer = this.getUser(this.activity.organizerId);

          if (this.activity.organizerId === this.userService.loggedInUser.id){
            this.activityEdit.setOrganizer(this.userService.loggedInUser.id)
          }


          this.searchedMenus$ = this.searchTerms.pipe(
            debounceTime(300),  // wait after char input
            distinctUntilChanged(),       //ignore if repeated
            // switch to new obs. when term changes
            switchMap((term: string) => this.menuService.searchMenus(term, this.category.id)),
          );
        })();
      })();

    })();


  }

  /**
   * Set timeout for async requests
   * @param ms - timeout duration
   */
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /**
   * split the main datum h1
   * @param date
   * @param part
   */
  protected getFirstPartOf(date: string, part: number) {
    let day =  date.split(' ');
    return day[part];
  }

  /**
   * Get the activity based on the router snapshot parameter
   */
  private getActivity(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.activityService.getActivity(id)
      .subscribe(activity => {
        this.activity = activity;

        // this.getInvites();
      });
  }

  /**
   * return router position
   */
  protected goBack(): void {
    this.location.back();

  }

  /**
   * Get all the invites of the current activity.id
   * Sort all those invites to the right array
   */
  private getInvites() {
    this.inviteService.getInvitationsOf(this.activity.id).subscribe(invites => {
      for (let invite of invites) {
          this.invites.push(invite);

          if (invite.going === true && invite.reacted === true) {
            //Store the invite
            this.attendeesInvites.push(invite);

            // Get the user (attendee)
            this.attendees.push(this.getUser(invite.userFk));
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

    });
  }

  /**
   * Get all the users
   */
  private getUsers() {
    this.userService.getUsers().subscribe(users => {
      for (let user of users) {
          this.users.push(user);
      }
    });
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

  /**
   * Get the right activity category
   * based on activity cat fk
   */
  protected getCategory() {
    this.categoryService.getCategory(this.activity.categoryFk)
      .subscribe(category => this.category = category);
  }

  /**
   * Get menus for the categoryFk
   * by: first get top layers (mainId = 0)
   */
  private getMenus() {
    this.countMenus = 0;

    //Get top menus
    this.menuService.getMenusBy(0, this.activity.categoryFk).subscribe(menus => {
      for (let menu of menus) {

          //Set the first main menu as active
          if (this.countMenus == 0){
            this.mainMenu = menu;
            this.subMenus = this.getMenusBy(menu.id);
          }

          //Push other top menus to the list
          this.menus.push(menu);

          this.countMenus=this.countMenus+1;
      }
    });
  }

  /**
   * get the SUB menus based on the main id
   * @param mainId
   */
  public getMenusBy(mainId: number):Menu[]{
    let menuI: Menu[] = [];
    this.menuService.getMenusBy(mainId, this.activity.categoryFk).subscribe(menus => {
      for(let menu of menus){
          menuI.push(menu);
      }
    });

    return menuI;
  }

  /**
   * Get the sub menus of an main meny
   * @param menu  (main)
   */
  loadSubCat(menu: Menu ){
    this.mainMenu = null;

    //Delay for animations
    (async () => {
      await this.delay(500);
      this.mainMenu = menu;
    })();

    this.subMenus = this.getMenusBy(menu.id);
    this.clearSearch();
  }

  /**
   * Add an menu to the personal orders
   * @param menu
   */
  addOrder(menu: Menu){
    this.personalOrders.push(menu);

    //calculate new price
    this.personalPrice = parseFloat((this.personalPrice + menu.price).toFixed(2))
  }

  /**
   * Search trough all the menu's (of current category)
   * @param term - string
   */
  searchMenus(term: string):void {
    this.searchIsEmpty = false;
    this.searchTerms.next(term);
  }

  /**
   * Clear the search terms and input
   */
  clearSearch() {
    this.searchIsEmpty = true;
    this.searchTerms.next('');
    $('#search-menus-input').val("");
  }

  /**
   * Check if there is an main menu set
   * @param menu (check for name)
   */
  checkIfSet(menu: Menu) {
    if(this.mainMenu != null){
      return this.mainMenu.name == menu.name;
    }
    return false;
  }




  section1 = false;
  section2 = false;
  section3 = false;
  section4 = false;
  section5 = false;
}

