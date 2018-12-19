import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getEstimates():Observable<any> {
    return this.http.get(endpoint + 'estimate').pipe(
      map(this.extractData));
  }

  getById(_estimateId):Observable<any> {
    return this.http.get(endpoint + 'estimate/' + _estimateId).pipe(
      map(this.extractData));
  }

  getLookupByCode(_lookupCode: string):Observable<any> {
    return this.http.get(endpoint + 'lookup/' + _lookupCode).pipe(
      map(this.extractData));
  }

  addEstimate (_estimate): Observable<any> {
    console.log(_estimate);
    return this.http.post<any>(endpoint + 'estimate', JSON.stringify(_estimate), httpOptions).pipe(
      tap((estimate) => console.log(`added estimate w/ id=${estimate.id}`)),
      catchError(this.handleError<any>('addEstimate'))
    );
  }

  updateEstimate (_estimate): Observable<any> {
    console.log('updating estimate');
    console.log(_estimate);
    return this.http.patch<any>(endpoint + 'estimate/' + _estimate.id, JSON.stringify(_estimate), httpOptions).pipe(
      tap((estimate) => console.log(`updated  estimate w/ id=${estimate.id}`)),
      catchError(this.handleError<any>('updateEstimate'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
