import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  private login = "http://localhost:8080/rest_aquadine_war_exploded-1.0/services/rest/users";

  constructor(private http: HttpClient){}

  loginUser(user){
    return this.http.post<any>(this.login, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

}
