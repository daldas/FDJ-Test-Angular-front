import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


export interface Leagues {
    id: Number,
  league: String,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})

export class LeaguesService {

  private accessToken;
  private headers;

  constructor(private http:Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({});
  }


  getLeagues():Observable<Leagues[]> {
    return this.http.get(API_URL + '/leagues',
        new RequestOptions({headers: this.headers})
    )
        .pipe(
            map(res => {
              let modifiedResult = res.json();
              modifiedResult = modifiedResult.map(function (leagues) {
                leagues.isUpdating = false;
                return leagues;
              });
              return modifiedResult;
            }));

  }



}