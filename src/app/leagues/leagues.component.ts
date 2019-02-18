import { Component, OnInit } from '@angular/core';
import { Leagues, LeaguesService } from '../leagues.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {

  leagues: Leagues[];
  errorMessage: string;

  isLoading: boolean = true;

  constructor(private leaguesService: LeaguesService) {}

  ngOnInit() {
    this.getLeagues();
  }

  getLeagues() {
    this.leaguesService
        .getLeagues()
        .subscribe(
            leagues => {
              this.leagues = leagues;
              this.isLoading = false;
            },
            error => this.errorMessage = <any>error
        );
  }


  findLeagues(id): Leagues {
    return this.leagues.find(leagues => leagues.id === id);
  }

  isUpdating(id): boolean {
    return this.findLeagues(id).isUpdating;
  }


}
