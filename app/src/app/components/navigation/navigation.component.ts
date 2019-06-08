import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/users.service/users.service";
import {User} from "../../models/User";
import * as $ from "jquery";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
      this.shrinkNav();
      this.mobileShrinkNav();
  }

  ngOnViewInit() {

  }

  shrinkNav() {
      let shrinkNav = 100;

      $(window).scroll(function() {
          let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

          if ( currentScroll >= shrinkNav ) {
              $( "#top-bar" ).css("display", "none");
              $( "nav ul" ).css("margin", "0");
              $( "nav" ).removeClass("nav-round").addClass("shrink");
              $( ".navbar-logo img").addClass("shrink-img");
          }
          else {
              $('nav').removeClass("shrink").addClass("nav-round");
              $( ".navbar-logo img").removeClass("shrink-img");
              $( "#top-bar" ).css("display", "inherit");
              $( "nav ul" ).css("margin", "52px 0 0 0");
          }

      });
  }

  mobileShrinkNav() {
      $(window).scroll(function() {
          let mobileNav = 1;
          let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

          if ( currentScroll >= mobileNav ) {
              // $( "button.navbar-toggler" ).attr("aria-expanded", "false").addClass(" collapsed ");
              $( ".navbar-collapse" ).removeClass(" show ").addClass(" collapsed ");
          }

      });
  }

  logout() {
    this.userService.setLoggedIn(null);
  }
}
