import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class newsLetterService {

  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub:any) {
    return this.http.post('http://localhost:8080/login', sub);
  }

  send() {
    return this.http.post('http://localhost:8080/login', null);
  }

}
