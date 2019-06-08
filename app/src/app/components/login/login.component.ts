import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/users.service/users.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  users: User[];
  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


   show: boolean;

  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const email = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    for (let user of this.users){
      if (email === user.email&& password === user.password){
        this.show = false;
        this.router.navigate(['/dashboard']);
        this.userService.setLoggedIn(user);
        break;
      }
    }
      this.show = true;
  }


}

