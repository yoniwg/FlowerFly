import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";


const BASE = "http://localhost:3000/login";

const tapOnError = function(action: (Error) => void) {
  return catchError(err => {
    action(err);
    return Observable.throw(err);
  });
};

@Injectable()
export class LoginService {

  private user = null;
  get isLoggedIn() {return this.user != null}

  constructor(private http : HttpClient) {}

  login(username, password): Observable<void> {
    return this.http
      .get(BASE + "/login")
      .pipe(
        tap(res => this.user = (res as any).user)
        // , tapOnError(err => this.user = null)
        , map(_ => null)
      )
  }

  logout(): Observable<void> {
    return this.http
      .get(BASE + "/logout")
      .pipe(
        tap(_ => this.user = null),
        map(_ => null)
      )
  }

  hasPermission(permissions): boolean {
    return true
  }


}
