import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

export interface Teams {
  id: Number,
  logo: String,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})

export class TeamsService {

  private accessToken;
  private headers;

  constructor(private http:Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({});
  }


  getTeams(strLeague):Observable<Teams[]> {
    return this.http.get(API_URL + '/teams/' + strLeague,
        new RequestOptions({ headers: this.headers })
    )
        .pipe(map(res => {
          let modifiedResult = res.json();
          modifiedResult = modifiedResult.map(function (teams) {
            teams.isUpdating = false;
            return teams;
          });
          return modifiedResult;
        }));

  }



}