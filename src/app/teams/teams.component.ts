import { Input, Component, OnInit } from '@angular/core';
import { Teams, TeamsService } from '../teams.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Teams[];
  errorMessage: string;
  strLeague: string;
  isLoading: boolean = true;
league : string;
  @Input() showMePartially: boolean;
  @Input() ligue: string;

  constructor(private teamsService: TeamsService,private http:Http,private route: ActivatedRoute) {}


  ngOnInit() {
    this.strLeague = this.route.snapshot.paramMap.get("strLeague");

    //console.log(this.showMePartially);
   if(this.ligue) this.getTeams(this.ligue);
  }

  getligue(ligue) {
    console.log(ligue);
  }


  getTeams(strLeague) {
    this.teamsService
        .getTeams(strLeague)
        .subscribe(
            teams => {
              this.teams = teams;
              this.isLoading = false;
            },
            error => this.errorMessage = <any>error
        );
  }


  findTeams(id): Teams {
    return this.teams.find(teams => teams.id === id);
  }

  isUpdating(id): boolean {
    return this.findTeams(id).isUpdating;
  }

}
