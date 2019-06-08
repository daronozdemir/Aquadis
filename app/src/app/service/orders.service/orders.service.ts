import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../../models/Order';
import { LogService } from '../../log/log.service/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class OrderService {

  private ordersUrl = 'http://localhost:8080/rest_aquadine_war_exploded-1.0/services/rest/orders';  // URL to web api

  loggedInOrder:Order = null;

  constructor(
    private http: HttpClient,
    private logService: LogService) { }


  setLoggedIn(order: Order): void {

    this.loggedInOrder = order;
  }


  /** GET activies from the server */
  getOrders (): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl)
      .pipe(
        tap(_ => this.log('fetched order')),
        catchError(this.handleError('getOrders', []))
      );
  }

  /** GET order by id. Return `undefined` when id not found */
  getOrderNo404<Data>(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order[]>(url)
      .pipe(
        map(orders => orders[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} order id=${id}`);
        }),
        catchError(this.handleError<Order>(`getOrder id=${id}`))
      );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  getOrdersOf(userFk: number): Observable<Order[]> {
    const url = `${this.ordersUrl}/user/${userFk}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_ => this.log(`fetched order id=${userFk}`)),
      catchError(this.handleError<Order[]>(`getOrders of userFk =${userFk}`))
    );
  }
  getOrdersBy(invitationFk: number): Observable<Order[]> {
    const url = `${this.ordersUrl}/invitation/${invitationFk}`;
    return this.http.get<Order[]>(url).pipe(
      tap(_ => this.log(`fetched order id=${invitationFk}`)),
      catchError(this.handleError<Order[]>(`getOrders of invitation =${invitationFk}`))
    );
  }

  /* GET orders whose name contains search term */
  searchOrders(term: string): Observable<Order[]> {
    if (!term.trim()) {
      // if not search term, return empty order array.
      return of([]);
    }
    return this.http.get<Order[]>(`${this.ordersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found orders matching "${term}"`)),
      catchError(this.handleError<Order[]>('searchOrders', []))
    );
  }


  /** POST: add a new order to the server */
  addOrder (order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, httpOptions).pipe(
      tap((newOrder: Order) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** DELETE: delete the order from the server */
  deleteOrder (order: Order | number): Observable<Order> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.ordersUrl}/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  /** PUT: update the order on the server */
  updateOrder (order: Order): Observable<any> {
    return this.http.put(this.ordersUrl, order, httpOptions).pipe(
      tap(_ => this.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
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

      // TODO: better job of transforming error for order consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a OrderService message with the LogService */
  private log(message: string) {
    this.logService.add(`OrderService: ${message}`);
  }

  getOrdersS(fk: number, orders: any) {
    let data: Order[] = [];
    for (let order of orders){
      if (order.id === fk){
        data.push(order);
      }
    }
    return data;
  }
}
