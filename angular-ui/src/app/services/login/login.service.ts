import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Credentials} from "./credentials";
import {User} from "./user";
import {UserRole} from "../../model/user-role.enum";


const BASE = "http://localhost:3000/login";


@Injectable()
export class LoginService {

  private userObj: User = new User();

  get isLoggedIn() {
    return this.userObj.username;
  }

  get username() {
    return this.userObj.username;
  }

  get fullName() {
    return this.userObj.fullName;
  }

  get userRole() {
    return this.userObj.role;
  }

  constructor(private http : HttpClient) {  }

  login(cred: Credentials): Observable<void> {
    return this.http
      .post(BASE + "/login",cred,{withCredentials: true})
      .pipe(
        tap(res =>{
          this.userObj = (res as User)
        })
        // , tapOnError(err => this.user = null)
        , map(_ => null)
      )
  }

  logout(): Observable<any> {
    return this.http
      .get(BASE + "/logout",{withCredentials: true})
      .pipe(
        tap(_ => {
          this.userObj = new User();
        })
      )
  }

  setUserIfSignedIn() : void{
    this.http
      .get(BASE + "/whoIsLoggedIn",{withCredentials: true})
      .subscribe(
        res => this.userObj = (res as User),
          err => this.userObj = null)
  }

}
