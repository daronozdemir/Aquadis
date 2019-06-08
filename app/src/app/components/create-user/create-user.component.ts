import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../service/users.service/users.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Input() user: User ={
    id: null,
    username:" ",
    password:" ",
    email:" ",
    name:" ",
    avatarUrl:"../../../assets/users/1.jpg"
  };

  users: User[];
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  onSubmit(){
    this.userService.addUser(this.user);
  }

  submitUser(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const username = target.querySelector('#username').value;
    const emailAuth = target.querySelector('#email').value;
    const changedPassword = target.querySelector('#password').value;
    const avatarUrl = "../../../assets/users/1.jpg";
    const array =  emailAuth.split("@");

      console.log("before create");
    if (array[1] === "aquadine.nl"){
      console.log("after create");
      this.user.username = username;
      this.user.name = name;
      this.user.avatarUrl = avatarUrl;
      this.user.email = emailAuth;
      this.user.password = changedPassword;
      this.user.id = this.users.length + 1;
      console.log(this.user);

      if (this.user.username === "" || this.user.name === "" || this.user.email === "" || this.user.password === ""
        || this.user.id === null) {
        alert("Not correctly filled in")
      }else{
        this.userService.addUser(this.user).subscribe(a =>alert("Succesfully created user"));
        console.log(this.user);
      }
    }else{
      alert("Mail moet van aquadine zijn")
    }
    this.getUsers();
  }
}
