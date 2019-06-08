import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/Activity";
import {Category} from "../../models/Category";
import {User} from "../../models/User";
import {Invite} from "../../models/Invite";
import {Menu} from "../../models/Menu";
import {Order} from "../../models/Order";
import {Observable, Subject} from "rxjs";
import {EditActivityService} from "../../edit-activity.service";
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../../service/activity.service/activity.service";
import {Location} from "@angular/common";
import {UserService} from "../../service/users.service/users.service";
import {InviteService} from "../../service/invitations.service/invitations.service";
import {CategoryService} from "../../service/categories.service/categories.service";
import {MenuService} from "../../service/menus.service/menus.service";
import {OrderService} from "../../service/orders.service/orders.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import * as $ from "jquery";


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  section1 = false;
  section2 = false;
  section3 = false;
  section4 = false;
  section5 = false;
  section6 = false;




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


  private searchTermsCat= new Subject<string>();

  searchedCats$: Observable<Category[]>;

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


  ) {}

  ngOnInit(): void {


    this.clearSearch();

    (async () => {
      this.getActivity();
      await this.delay(500);


      this.getUsers();
      this.getInvites();

      (async () => {
        this.getCategory();
        await this.delay(200);
        this.getMenus();


        (async () => {
          await this.delay(500);
          this.organizer = this.getUser(this.activity.organizerId);

          if (this.activity.organizerId === this.userService.loggedInUser.id){
            this.activityEdit.setOrganizer(this.userService.loggedInUser.id)
          }




        })();
      })();

    })();

    (async () => {

      await this.delay(500);
      this.getCategories();

      this.searchedCats$ = this.searchTermsCat.pipe(
        debounceTime(300),  // wait after char input
        distinctUntilChanged(),       //ignore if repeated
        // switch to new obs. when term changes
        switchMap((term: string) => this.categoryService.searchCategories(term)),
      );
    })();

  }

  getCountMenuItems(foodCat: number):number {
    let count = 0;
    this.menuService.getMenusByCat(foodCat).subscribe(menus => {
      for (let menu of menus){
        count = count+1;
      }
    });
    return count;
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
      .subscribe(activity => this.activity = activity);
  }

  /**
   * return router position
   */
  public goBack(): void {
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

  categories: Category[]=[];
  /**
   * Get the right activity category
   * based on activity cat fk
   */

  getCategories(){
    this.categoryService.getCategories()
      .subscribe(categoriesN => {
        for (let cat of categoriesN){
          this.categories.push(cat);
        }
      });
  }
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

  searchCatIsEmpty: boolean = true;

  searchCategory(term: string):void {
    this.searchCatIsEmpty = false;
    this.searchTermsCat.next(term);

    if(term.length === 0||term === null)this.clearSearchCat();
  }






  /**
   * Clear the search terms and input
   */
  clearSearchCat() {
    this.searchCatIsEmpty = true;
    this.searchTermsCat.next('');
    $('#search-cats-input').val("");
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

  alertMess() {
    alert('Alle uitnodigingen zijn verstuurd.');
  }
}
