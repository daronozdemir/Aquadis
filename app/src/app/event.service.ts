import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private loginURL = "http://localhost:8080/rest_aquadine_war_exploded-1.0/services/rest/users";

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.loginURL)
  }
}
