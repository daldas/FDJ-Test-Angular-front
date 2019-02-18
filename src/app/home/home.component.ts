import { Input, Component, OnInit } from '@angular/core';
import {LeaguesService} from '../leagues.service';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators , ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap,startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import {TeamsService} from '../teams.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
    showVar: boolean = true;

    @Input() search: string;

  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
    usersForm: FormGroup;
    league: string = "English Premier League";

   // this.myGroup = new FormGroup({ firstName: new FormControl() });
    ngOnInit() {
        this.usersForm =new FormGroup({ myControl: new FormControl() });

    }


    toggleTeams(ligue){

        this.showVar = !this.showVar;
        this.league = ligue;
        console.log( this.league );
       // this.league = this.league;
    }

  constructor(private service: LeaguesService,private fb: FormBuilder) {

    this.filteredOptions = this.myControl.valueChanges
        .pipe(
            startWith(null),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(val => {
              return this.filter(val || '')
            })
        );
  }



        filter(val: string): Observable<any[]> {
    return this.service.getLeagues()
        .pipe(
            map(response => response.filter(option => {
              return option.league.toLowerCase().indexOf(val.toLowerCase()) === 0
            }))
        )
  }


}
