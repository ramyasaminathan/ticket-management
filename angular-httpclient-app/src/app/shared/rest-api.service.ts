import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../shared/ticket';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) 
  } 
  
  createTicket(ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiURL + '/tickets', JSON.stringify(ticket), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  getTickets(): Observable<Ticket> {
    return this.http.get<Ticket>(this.apiURL + '/tickets')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getTicket(id): Observable<Ticket> {
    return this.http.get<Ticket>(this.apiURL + '/tickets/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  updateTicket(id, ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.apiURL + '/tickets/' + id, JSON.stringify(ticket), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  deleteTicket(id){
    return this.http.delete<Ticket>(this.apiURL + '/tickets/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
