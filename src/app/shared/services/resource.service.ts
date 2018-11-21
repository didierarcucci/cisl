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
export class ResourceService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getResources():Observable<any> {
    return this.http.get(endpoint + 'resource').pipe(
      map(this.extractData));
  }

  getById(_resourceId):Observable<any> {
    return this.http.get(endpoint + 'resource/' + _resourceId).pipe(
      map(this.extractData));
  }

  getCountByRole():Observable<any> {
    return this.http.get(endpoint + 'resourcecountbyrole').pipe(
      map(this.extractData));
  }

  getCountByTechStack():Observable<any> {
    return this.http.get(endpoint + 'resourcecountbytechstack').pipe(
      map(this.extractData));
  }

  getCountActive():Observable<any> {
    return this.http.get(endpoint + 'resourcecountactive').pipe(
      map(this.extractData));
  }

  getCountByLocation():Observable<any> {
    return this.http.get(endpoint + 'resourcecountbylocation').pipe(
      map(this.extractData));
  }

  getCountByTeam():Observable<any> {
    return this.http.get(endpoint + 'resourcecountbyteam').pipe(
      map(this.extractData));
  }

  getLookupByCode(_lookupCode: string):Observable<any> {
    return this.http.get(endpoint + 'lookup/' + _lookupCode).pipe(
      map(this.extractData));
  }

  addResource (_resource): Observable<any> {
    console.log(_resource);
    return this.http.post<any>(endpoint + 'resource', JSON.stringify(_resource), httpOptions).pipe(
      tap((resource) => console.log(`added resource w/ id=${resource.id}`)),
      catchError(this.handleError<any>('addResource'))
    );
  }

  updateResource (_resource): Observable<any> {
    console.log('updating resource');
    console.log(_resource);
    return this.http.patch<any>(endpoint + 'resource/' + _resource.id, JSON.stringify(_resource), httpOptions).pipe(
      tap((resource) => console.log(`updated  resource w/ id=${resource.id}`)),
      catchError(this.handleError<any>('updateResource'))
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
