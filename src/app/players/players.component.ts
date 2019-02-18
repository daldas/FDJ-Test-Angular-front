import { Component, OnInit } from '@angular/core';
import { Players, PlayersService } from '../players.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Players[];
  errorMessage: string;
  id: string;
  isLoading: boolean = true;

  constructor(private playersService: PlayersService,private http:Http,private route: ActivatedRoute) {}

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get("id");
    this.getPlayers(this.id);
  }

  getPlayers(id) {
    this.playersService
        .getPlayers(id)
        .subscribe(
            players => {
              this.players = players;
              this.isLoading = false;
            },
            error => this.errorMessage = <any>error
        );
  }


  findPlayers(id): Players {
    return this.players.find(players => players.id === id);
  }

  isUpdating(id): boolean {
    return this.findPlayers(id).isUpdating;
  }


}
