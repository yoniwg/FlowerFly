import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Credentials} from "./credentials";


const BASE = "http://localhost:3000/login";

const tapOnError = function(action: (Error) => void) {
  return catchError(err => {
    action(err);
    return Observable.throw(err);
  });
};

@Injectable()
export class LoginService {

  private userRole = null;
  private username = null;

  get isLoggedIn() {
    return this.userRole != null
  }

  constructor(private http : HttpClient) {  }

  login(cred: Credentials): Observable<void> {
    return this.http
      .post(BASE + "/login",cred,{withCredentials: true})
      .pipe(
        tap(res =>{
          this.username = cred.username;
          this.userRole = (res as any).userRole
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
          this.userRole = null;
          this.username = null;
        })
      )
  }

  hasPermission(permissions): boolean {
    return true
  }


}
