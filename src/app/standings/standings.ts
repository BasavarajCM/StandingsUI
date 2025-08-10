import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StandingsApiService } from './standings-api.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-standings',
  imports: [MaterialModule, FormsModule, CommonModule, HttpClientModule],
  providers: [StandingsApiService],
  templateUrl: './standings.html',
  styleUrls: ['./standings.scss']
})
export class Standings implements OnInit {
  country = '';
  league = '';
  team = '';
  offlineMode = false;
  standings: any[] | null = null;
  countries: any[] = [];
  leagues: any[] = [];
  teams: any[] = [];

  private mockCountries = [
    { country_id: '44', country_name: 'England', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/44_england.png' },
    { country_id: '3', country_name: 'France', country_logo: 'https://apiv3.apifootball.com/badges/logo_country/3_france.png' }
  ];
  private mockLeagues = [
    { country_id: '44', country_name: 'England', league_id: '149', league_name: 'Non League Premier', league_season: '2024/2025', league_logo: 'https://apiv3.apifootball.com/badges/logo_leagues/149_non-league-premier.png' }
  ];
  private mockTeams = [
    { team_key: '3035', team_name: 'Horsham', team_badge: 'https://apiv3.apifootball.com/badges/3035_horsham.jpg' },
    { team_key: '2986', team_name: 'Billericay Town', team_badge: 'https://apiv3.apifootball.com/badges/2986_billericay-town.jpg' }
  ];
  private mockStandings = [
    { team_id: '3035', team_name: 'Horsham', overall_league_position: '1', overall_league_PTS: '87', overall_league_payed: '42', overall_league_W: '28', overall_league_D: '3', overall_league_L: '11', team_badge: 'https://apiv3.apifootball.com/badges/3035_horsham.jpg' },
    { team_id: '2986', team_name: 'Billericay Town', overall_league_position: '2', overall_league_PTS: '87', overall_league_payed: '42', overall_league_W: '26', overall_league_D: '9', overall_league_L: '7', team_badge: 'https://apiv3.apifootball.com/badges/2986_billericay-town.jpg' }
  ];

  constructor(private api: StandingsApiService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    if (this.offlineMode) {
      this.countries = this.mockCountries;
    } else {
      this.api.getCountries().subscribe(data => this.countries = data.length ? data : this.mockCountries);
    }
  }

  onCountryChange() {
    this.league = '';
    this.team = '';
    this.leagues = [];
    this.teams = [];
    if (this.country) {
      if (this.offlineMode) {
        this.leagues = this.mockLeagues.filter(l => l.country_id === this.country);
      } else {
        this.api.getLeagues(this.country).subscribe(data => this.leagues = data.length ? data : this.mockLeagues);
      }
    }
  }

  onLeagueChange() {
    this.team = '';
    this.teams = [];
    if (this.league) {
      if (this.offlineMode) {
        this.teams = this.mockTeams;
      } else {
        this.api.getTeams(this.league).subscribe(data => this.teams = data.length ? data : this.mockTeams);
      }
    }
  }

  getStandings(teamKey?: string) {
    if (this.league) {
      if (this.offlineMode) {
        this.standings = teamKey
          ? this.mockStandings.filter(s => s.team_id === teamKey)
          : this.mockStandings;
      } else {
        this.api.getStandings(this.league).subscribe(data => {
          this.standings = teamKey
            ? data.filter(s => s.team_id === teamKey)
            : data.length
            ? data
            : this.mockStandings;
        });
      }
    }
  }
}
