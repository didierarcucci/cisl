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

  getComponentById(_componentId):Observable<any> {
    return this.http.get(endpoint + 'component/' + _componentId).pipe(
      map(this.extractData));
  }

  addComponent (_component): Observable<any> {
    console.log(_component);
    return this.http.post<any>(endpoint + 'component', JSON.stringify(_component), httpOptions).pipe(
      tap((component) => console.log(`added component w/ id=${component.id}`)),
      catchError(this.handleError<any>('addComponent'))
    );
  }

  updateComponent (_component): Observable<any> {
    console.log('updating component');
    console.log(_component);
    return this.http.patch<any>(endpoint + 'component/' + _component.id, JSON.stringify(_component), httpOptions).pipe(
      tap((component) => console.log(`updated  component w/ id=${component.id}`)),
      catchError(this.handleError<any>('updateComponent'))
    );
  }

  deleteComponent (_componentId): Observable<any> {
    console.log('deleting component');
    console.log(_componentId);
    return this.http.delete<any>(endpoint + 'component/' + _componentId, httpOptions).pipe(
      tap(() => console.log('deleted component')),
      catchError(this.handleError<any>('deleteComponent'))
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
