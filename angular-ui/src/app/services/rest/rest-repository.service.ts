import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

const BASE = "http://localhost:3000/rest";

const log = x => { console.log(x); return x };

const NotImplementedObservable = null;//Observable.of(new Error("Not implement."));

@Injectable()
export class RestRepositoryService {

  constructor(private http: HttpClient) { }

  getItem(type: string, id: string): Observable<any> {
    return this.http
      .get(`${BASE}/${type}/${id}`,{withCredentials: true})
      .pipe(map(res => (res as any).item))
  }

  getItems(type: string): Observable<any[]> {
      return this.http
      .get(`${BASE}/${type}/all`,{withCredentials: true})
      .pipe(map(res => log((res as any).items)))
  }

  putItem(type: string, data: any): Observable<any> {
    return this.http
      .put(`${BASE}/${type}/${data._id}`,data,{withCredentials: true})
  }

}
