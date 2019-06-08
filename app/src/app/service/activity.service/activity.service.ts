import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Activity } from '../../models/Activity';
import { LogService } from '../../log/log.service/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ActivityService {

  private activitiesUrl = 'http://aquadine.odw.nl/api/activities';  // URL to web api

  constructor(
    private http: HttpClient,
    private logService: LogService) { }

  /** GET activies from the server */
  getActivities (): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitiesUrl)
      .pipe(
        tap(_ => this.log('fetched activity')),
        catchError(this.handleError('getActivities', []))
      );
  }

  /** GET activity by id. Return `undefined` when id not found */
  getActivityNo404<Data>(id: number): Observable<Activity> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.get<Activity[]>(url)
      .pipe(
        map(activities => activities[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} activity id=${id}`);
        }),
        catchError(this.handleError<Activity>(`getActivity id=${id}`))
      );
  }

  /** GET activity by id. Will 404 if id not found */
  getActivity(id: number): Observable<Activity> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      tap(_ => this.log(`fetched activity id=${id}`)),
      catchError(this.handleError<Activity>(`getActivity id=${id}`))
    );
  }

  /* GET activities whose name contains search term */
  searchActivities(term: string): Observable<Activity[]> {
    if (!term.trim()) {
      // if not search term, return empty activity array.
      return of([]);
    }
    return this.http.get<Activity[]>(`${this.activitiesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found activities matching "${term}"`)),
      catchError(this.handleError<Activity[]>('searchActivities', []))
    );
  }


  /** POST: add a new activity to the server */
  addActivity (activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.activitiesUrl, activity, httpOptions).pipe(
      tap((newActivity: Activity) => this.log(`added activity w/ id=${newActivity.id}`)),
      catchError(this.handleError<Activity>('addActivity'))
    );
  }

  /** DELETE: delete the activity from the server */
  deleteActivity (activity: Activity | number): Observable<Activity> {
    const id = typeof activity === 'number' ? activity : activity.id;
    const url = `${this.activitiesUrl}/${id}`;

    return this.http.delete<Activity>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted activity id=${id}`)),
      catchError(this.handleError<Activity>('deleteActivity'))
    );
  }

  /** PUT: update the activity on the server */
  updateActivity (activity: Activity): Observable<any> {
    return this.http.put(this.activitiesUrl, activity, httpOptions).pipe(
      tap(_ => this.log(`updated activity id=${activity.id}`)),
      catchError(this.handleError<any>('updateActivity'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ActivityService message with the LogService */
  private log(message: string) {
    this.logService.add(`ActivityService: ${message}`);
  }
}
