import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../service/users.service/users.service";
import {User} from "../../models/User";
import {newsLetterService} from "../../service/newsletterService.service/newsLetterService";
import {SwPush} from "@angular/service-worker";

@Component({
  selector: 'app-manage-user',
  providers: [ newsLetterService ],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  @Input() loggedInUser: User = null;
  loading: boolean = false;
  statee: string = 'niet';

  readonly VAPID_PUBLIC_KEY = "BJ_lWzE6i6u1HbEt9oMTT44SGKg6quXxEKKPTb9VuPDe9goVhH_Se1PBJjAjeTNhUNCMgb3HQeC8pYgjivXzpu0";
  sub: PushSubscription;
  stateee: string = 'inschrijven';

  constructor(public userService: UserService,
              private newsletterService: newsLetterService,
              private swPush: SwPush) { }

  ngOnInit() {

    (async () => {
      await this.delay(1000);
      this.loggedInUser = this.userService.loggedInUser;
    })();


  }

  reload(){
    this.userService.getUser(this.userService.loggedInUser.id).subscribe(user => {
        this.loggedInUser = user;
    });
  }

  /**
   * Set timeout for async requests
   * @param ms - timeout duration
   */
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }



  save(){
    this.userService.addUser(this.loggedInUser).subscribe();
    alert("User updated.")
  }


  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {

      this.sub = sub;
      console.log("Notification Subscription: ", sub);

      this.newsletterService.addPushSubscriber(sub).subscribe(
        () => console.log('Sent push subscription object to server.'),
        err =>  console.log('Could not send subscription object to server, reason: ', err)
      );

    }).catch(err => console.error("Could not subscribe to notifications", err));

  }



  sendNewsletter() {
    console.log("Sending Newsletter to all Subscribers ...");

    this.newsletterService.send().subscribe();
  }


  toggles() {
    this.subscribeToNotifications();

    if(this.statee==='wel'){
      this.statee='niet'; this.stateee='inschrijven';
    } else {
      this.statee='wel'; this.stateee='uitschrijven';
    }

  }
}
