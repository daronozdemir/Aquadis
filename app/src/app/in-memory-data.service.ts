import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Activity } from './models/Activity';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const activities = [
      { id: 1, date: "Maandag 18 februari", categoryFk: 4, category:"Pizza", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/pizza.png",description: "Pizza tijd op maandag! Bijna elke pizza is bestelbaar, behalve die met ananas natuurlijk.", attendees: 30, unknown: 4, notAttending: 2},
      { id: 2, date: "Maandag 25 februari", categoryFk: 1, category:"Spare Ribs", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/spare-ribs.png",description: "Lorem ipsum dolar.", attendees: 20, unknown: 5, notAttending: 5},
      { id: 3, date: "Maandag 10 maart", categoryFk: 3, category:"Vegetarian", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/vegetarian.png",description: "Lorem ipsum dolar.", attendees: 24, unknown: 5, notAttending: 2},
      { id: 4, date: "Maandag 12 januari", categoryFk: 1, category:"Spare Ribs", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/spare-ribs.png",description: "Lorem ipsum dolar.", attendees: 14, unknown: 3, notAttending: 2},
      { id: 5, date: "Maandag 18 augustus", categoryFk: 1, category:"Spare Ribs", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/spare-ribs.png",description: "Lorem ipsum dolar.", attendees: 24, unknown: 5, notAttending: 2},
      { id: 6, date: "Maandag 18 april",categoryFk: 3,  category:"Vegetarian", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/vegetarian.png",description: "Lorem ipsum dolar.", attendees: 18, unknown: 5, notAttending: 2},
      { id: 7, date: "Maandag 25 april",categoryFk: 3,  category:"Vegetarian", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/vegetarian.png",description: "Lorem ipsum dolar.", attendees: 18, unknown: 5, notAttending: 2},
      { id: 8, date: "Maandag 2 mei",categoryFk: 1,  category:"Spare Ribs", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/spare-ribs.png",description: "Lorem ipsum dolar.", attendees: 18, unknown: 5, notAttending: 2},
      { id: 9, date: "Maandag 9 mei",categoryFk: 3,  category:"Vegetarian", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/vegetarian.png",description: "Lorem ipsum dolar.", attendees: 18, unknown: 5, notAttending: 2},
      { id: 10, date: "Maandag 16 mei",categoryFk: 1,  category:"Spare Ribs", organizerId: 1, organizer: 'Mr. Nice',img: "../../../assets/misc/spare-ribs.png",description: "Lorem ipsum dolar.", attendees: 18, unknown: 5, notAttending: 2}
    ];


    const orders = [
      {id: 1, invitationFk: 1, userFk: 1, menuFk: 2},
      {id: 2, invitationFk: 1, userFk: 1, menuFk: 6}
    ];

    const categories = [
      {id: 1, name: 'Spare Ribs', image: '../../../assets/misc/spare-ribs.png', icon: '../../../assets/icons/category/meat.png'},
      {id: 2, name: 'Fast food', image: '../../../assets/misc/spare-ribs.png', icon: '../../../assets/icons/category/meat.png'},
      {id: 3, name: 'Vegetarian', image: '../../../assets/misc/vegetarian.png', icon: '../../../assets/icons/category/salade.png'},
      {id: 4, name: 'Pizza', image: '../../../assets/misc/pizza.png', icon: '../../../assets/icons/category/pizza.png'}
    ];

    const menus = [
      {id: 1, categoryFk: 1, mainId: 0, name: 'Spare ribs', description: 'Desription about main menu category', img: '../../../assets/menus/1_1_1.png'},
      {id: 2, categoryFk: 1, mainId: 1, name: '650 gr Spare Ribs', description: 'Desription about menu item of main cat', price:4.55 ,img: '../../../assets/menus/2_1_1.png'},
      {id: 3, categoryFk: 1, mainId: 1, name: 'Ribs for two', description: 'Desription about menu item of main cat', price:18.00 ,img: '../../../assets/menus/3_1_1.png'},
      {id: 4, categoryFk: 1, mainId: 0, name: 'Burgers', description: 'Desription about main menu category',img: '../../../assets/menus/4_1_0.png'},
      {id: 5, categoryFk: 1, mainId: 4, name: 'Small burger tacu', description: 'without spareribs - Desription about menu item of main cat', price:5.99 ,img: '../../../assets/menus/5_1_4.png'},
      {id: 6, categoryFk: 1, mainId: 4, name: 'Large burger', description: 'with spareribs - Desription about menu item of main cat', price:8.55 ,img: '../../../assets/menus/6_1_4.png'},
      {id: 7, categoryFk: 1, mainId: 1, name: '1000gr Spare Ribs', description: 'Desription about menu item of main cat', price:18.00 ,img: '../../../assets/menus/7_1_1.png'},
      {id: 8, categoryFk: 1, mainId: 1, name: 'Spare Ribs Menu', description: 'Desription about menu item of main cat', price:18.00 ,img: '../../../assets/menus/8_1_1.png'},
      {id: 9, categoryFk: 4, mainId: 0, name: 'Pizza ', description: 'Desription about menu item of main cat', price:5.00 ,img: '../../../assets/menus/9_1_1.jpg'},
      {id: 10, categoryFk: 4, mainId: 9, name: 'Pizza 1', description: 'Desription about menu item of main cat', price:9.00 ,img: '../../../assets/menus/9_1_1.jpg'},
      {id: 11, categoryFk: 4, mainId: 9, name: 'Pizza 2', description: 'Desription about menu item of main cat', price:10.00 ,img: '../../../assets/menus/9_1_1.jpg'}
    ];


    const users = [
      { id: 1, name: 'William Bond', username: 'admin', password:'123',email:'nice@aquadine.nl', avatarUrl: "../../../assets/users/1.jpg"},
      { id: 2, name: 'Sander Veldhuizen', username: 'sndr', password:'temp123',email:'sander@aquadine.nl', avatarUrl: "../../../assets/users/2.jpg"},
      { id: 3, name: 'Jeffrey Smul', username: 'bnd', password:'temp123',email:'jeffrey@aquadine.nl', avatarUrl: "../../../assets/users/3.jpg"},
      { id: 4, name: 'Luca Kordon', username: 'lcs', password:'temp123',email:'luca@aquadine.nl', avatarUrl: "../../../assets/users/4.jpg"}
    ];

    const invitations = [
      { id: 1, activityFk: 1, userFk: 2, reacted: true, going: true, ordered: true},
      { id: 2, activityFk: 1, userFk: 3, reacted: false, going: false},
      { id: 3, activityFk: 1, userFk: 4, reacted: false, going: false},
      { id: 4, activityFk: 2, userFk: 2, reacted: true, going: false},
      { id: 5, activityFk: 2, userFk: 3, reacted: true, going: true},
      { id: 6, activityFk: 2, userFk: 4, reacted: false, going: false},
      { id: 7, activityFk: 1, userFk: 1, reacted: true, going: true},
      { id: 8, activityFk: 2, userFk: 1, reacted: false, going: false},
      { id: 9, activityFk: 3, userFk: 1, reacted: true, going: false},
      { id: 10, activityFk: 3, userFk: 4, reacted: true, going: false},

      { id: 11, activityFk: 4, userFk: 1, reacted: true, going: true},
      { id: 12, activityFk: 5, userFk: 1, reacted: true, going: true},
      { id: 13, activityFk: 6, userFk: 1, reacted: true, going: true},
      { id: 13, activityFk: 1, userFk: 1, reacted: true, going: true},

      { id: 14, activityFk: 4, userFk: 1, reacted: false, going: false},
      { id: 15, activityFk: 5, userFk: 1, reacted: false, going: false},
      { id: 16, activityFk: 2, userFk: 1, reacted: false, going: false},
      { id: 16, activityFk: 6, userFk: 1, reacted: false, going: false},

      { id: 17, activityFk: 7, userFk: 1, reacted: true, going: false},
      { id: 18, activityFk: 6, userFk: 1, reacted: true, going: false},
      { id: 19, activityFk: 8, userFk: 1, reacted: true, going: false},
      { id: 20, activityFk: 9, userFk: 1, reacted: true, going: false},
      { id: 21, activityFk: 10, userFk: 1, reacted: true, going: false},
      { id: 22, activityFk: 1, userFk: 1, reacted: true, going: false}
    ];

    return {activities,orders, menus, categories, users, invitations};
  }
}
