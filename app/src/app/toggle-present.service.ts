import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TogglePresentService {

  constructor() { }

   attending: boolean = false;
   isSet: boolean = false;

  reset(){
    this.attending = false;
    this.isSet = false;
  }

  isAttending(state: boolean){
      this.isSet = true;
      this.attending = state;
  }




}
