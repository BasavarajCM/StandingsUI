import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StandingsApiService {
  private apiUrl = 'http://localhost:8080/api/api/v1';
  private cache: any = {};

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    if (this.cache.countries) return of(this.cache.countries);
    return this.http.get<any[]>(`${this.apiUrl}/countries`).pipe(
      tap(data => this.cache.countries = data),
      catchError(() => of([]))
    );
  }

  getLeagues(countryId: string): Observable<any[]> {
    if (this.cache[`leagues_${countryId}`]) return of(this.cache[`leagues_${countryId}`]);
    return this.http.get<any[]>(`${this.apiUrl}/leagues?countryId=${countryId}`).pipe(
      tap(data => this.cache[`leagues_${countryId}`] = data),
      catchError(() => of([]))
    );
  }

  getTeams(leagueId: string): Observable<any[]> {
    if (this.cache[`teams_${leagueId}`]) return of(this.cache[`teams_${leagueId}`]);
    return this.http.get<any[]>(`${this.apiUrl}/teams?leagueId=${leagueId}`).pipe(
      tap(data => this.cache[`teams_${leagueId}`] = data),
      catchError(() => of([]))
    );
  }

  getStandings(leagueId: string): Observable<any[]> {
    if (this.cache[`standings_${leagueId}`]) return of(this.cache[`standings_${leagueId}`]);
    return this.http.get<any[]>(`${this.apiUrl}/standings?leagueId=${leagueId}`).pipe(
      tap(data => this.cache[`standings_${leagueId}`] = data),
      catchError(() => of([]))
    );
  }
}
