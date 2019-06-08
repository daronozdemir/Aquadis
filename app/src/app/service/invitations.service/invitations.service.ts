import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Invite } from '../../models/Invite';
import { LogService } from '../../log/log.service/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class InviteService {

  private invitationsUrl = 'http://aquadine.odw.nl/api/invitations';  // URL to web api

  constructor(
    private http: HttpClient,
    private logService: LogService) { }

  /** GET invitations from the server */
  getInvitations (): Observable<Invite[]> {
    return this.http.get<Invite[]>(this.invitationsUrl)
      .pipe(
        tap(_ => this.log('fetched invite')),
        catchError(this.handleError('getInvitations', []))
      );
  }

  /** GET invitations from the server */
  getInvitationsOf (activityFk: number): Observable<Invite[]> {
    const url = `${this.invitationsUrl}/activity/${activityFk}`;
    return this.http.get<Invite[]>(url)
      .pipe(
        tap(_ => this.log('fetched invites of '+{activityFk})),
        catchError(this.handleError('getInvitations of '+{activityFk}, []))
      );
  }

  getInvitationFor (userId: number, activityFk:number): Observable<Invite> {
    const url = `${this.invitationsUrl}/actusr/${userId}/${activityFk}`;
    return this.http.get<Invite>(url)
      .pipe(
        tap(_ => this.log('fetched invites of user '+{userId})),
        catchError(this.handleError<Invite>('getInvitations of '+{userId}, ))
      );
  }

  /** GET invitations from the server */
  getInvitationsFor (userId: number): Observable<Invite[]> {
    const url = `${this.invitationsUrl}/user/${userId}`;
    return this.http.get<Invite[]>(url)
      .pipe(
        tap(_ => this.log('fetched invites of '+{userId})),
        catchError(this.handleError('getInvitations of '+{userId}, []))
      );
  }


  /** GET invite by id. Return `undefined` when id not found */
  getInviteNo404<Data>(id: number): Observable<Invite> {
    const url = `${this.invitationsUrl}/${id}`;
    return this.http.get<Invite[]>(url)
      .pipe(
        map(invitations => invitations[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} invite id=${id}`);
        }),
        catchError(this.handleError<Invite>(`getInvite id=${id}`))
      );
  }

  /** GET invite by id. Will 404 if id not found */
  getInvite(id: number): Observable<Invite> {
    const url = `${this.invitationsUrl}/${id}`;
    return this.http.get<Invite>(url).pipe(
      tap(_ => this.log(`fetched invite id=${id}`)),
      catchError(this.handleError<Invite>(`getInvite id=${id}`))
    );
  }

  /* GET invitations whose name contains search term */
  searchInvitations(term: string): Observable<Invite[]> {
    if (!term.trim()) {
      // if not search term, return empty invite array.
      return of([]);
    }
    return this.http.get<Invite[]>(`${this.invitationsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found invitations matching "${term}"`)),
      catchError(this.handleError<Invite[]>('searchInvitations', []))
    );
  }


  /** POST: add a new invite to the server */
  addInvite (invite: Invite): Observable<Invite> {
    return this.http.post<Invite>(this.invitationsUrl, invite, httpOptions).pipe(
      tap((newInvite: Invite) => this.log(`added invite w/ id=${newInvite.id}`)),
      catchError(this.handleError<Invite>('addInvite'))
    );
  }

  /** DELETE: delete the invite from the server */
  deleteInvite (invite: Invite | number): Observable<Invite> {
    const id = typeof invite === 'number' ? invite : invite.id;
    const url = `${this.invitationsUrl}/${id}`;

    return this.http.delete<Invite>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted invite id=${id}`)),
      catchError(this.handleError<Invite>('deleteInvite'))
    );
  }

  /** PUT: update the invite on the server */
  updateInvite (invite: Invite): Observable<any> {
    return this.http.put(this.invitationsUrl, invite, httpOptions).pipe(
      tap(_ => this.log(`updated invite id=${invite.id}`)),
      catchError(this.handleError<any>('updateInvite'))
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

      // TODO: better job of transforming error for invite consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a InviteService message with the LogService */
  private log(message: string) {
    this.logService.add(`InviteService: ${message}`);
  }

}
