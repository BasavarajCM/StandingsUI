import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StandingsApiService {
  private apiUrl = 'http://localhost:8080/api/api/v1';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
     return this.http.get<any[]>(`${this.apiUrl}/countries`)
  }

  getLeagues(countryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leagues?countryId=${countryId}`
    );
  }

  getTeams(leagueId: string): Observable<any[]> {
   
    return this.http.get<any[]>(`${this.apiUrl}/teams?leagueId=${leagueId}`)
  }

  getStandings(leagueId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/standings?leagueId=${leagueId}`)
  }
}
