import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export class Player {
  constructor(public id: number, public name: string) {}
}

export interface Players {
  id: Number,
  image: String,
  name: String,
  poste: String,
  birthday: Date,
  price: String,
  isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})

export class PlayersService {

  private accessToken;
  private headers;

  constructor(private http:Http) {
    this.init();
  }

  async init() {
    this.headers = new Headers({});
  }


  getPlayers(id):Observable<Players[]> {
    return this.http.get(API_URL + '/players/' + id,
        new RequestOptions({headers: this.headers})
    )
        .pipe(
            map(res => {
          let modifiedResult = res.json();
          modifiedResult = modifiedResult.map(function (players) {
            players.isUpdating = false;
            return players;
          });
          return modifiedResult;
        }));

  }



}