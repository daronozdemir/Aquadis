import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditActivityService {

  showOrganizer: boolean = false;

  organizerId: number = null;

  constructor() { }


  setOrganizer(id: number){
    this.organizerId = id;
    this.showOrganizer = true;
  }

  clearOrganizer(){
    this.organizerId = null;
    this.showOrganizer = false;
  }
}
