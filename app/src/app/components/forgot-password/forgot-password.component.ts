import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../service/users.service/users.service";

@Component({
  selector: 'app-forgot-account',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @Input() user: User ={
    id: null,
    username:" ",
    password:" ",
    email:" ",
    name:" ",
    avatarUrl:null
  };
  users: User[];

  constructor(private userService: UserService) {  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  onSubmit(){
    this.userService.updateUser(this.user);
  }

  submitUser(event){
    event.preventDefault();
    const target = event.target;
    const emailAuth = target.querySelector('#email').value;
    const changedPassword = target.querySelector('#password').value;
    const array =  emailAuth.split("@");

    if (array[1] === "aquadine.nl"){
      
      for (let user of this.users) {
        this.user.username = user.username;
        this.user.name = user.name;
        this.user.avatarUrl = user.avatarUrl;
        this.user.email = emailAuth;
        this.user.password = changedPassword;
        this.user.id = user.id;
        if (this.user.email === "" || this.user.password === "") {
          alert("Not correctly filled in");
          break;
        }
        if (emailAuth === this.user.email){
          this.userService.updateUser(this.user).subscribe(an => alert("succesfully changed"));
          break;
        }else{
          alert("Account does not exist");
          break;
        }
      }
    }else{
      alert("Mail moet van aquadine zijn");
    }
    this.getUsers();
  }
}
