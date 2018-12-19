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
export class RoleService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getRoles():Observable<any> {
    return this.http.get(endpoint + 'role').pipe(
      map(this.extractData));
  }

  getById(_roleId):Observable<any> {
    return this.http.get(endpoint + 'role/' + _roleId).pipe(
      map(this.extractData));
  }

  getLookupByCode(_lookupCode: string):Observable<any> {
    return this.http.get(endpoint + 'lookup/' + _lookupCode).pipe(
      map(this.extractData));
  }

  addRole (_role): Observable<any> {
    console.log(_role);
    return this.http.post<any>(endpoint + 'role', JSON.stringify(_role), httpOptions).pipe(
      tap((role) => console.log(`added role w/ id=${role.id}`)),
      catchError(this.handleError<any>('addRole'))
    );
  }

  updateRole (_role): Observable<any> {
    console.log('updating role');
    console.log(_role);
    return this.http.patch<any>(endpoint + 'role/' + _role.id, JSON.stringify(_role), httpOptions).pipe(
      tap((role) => console.log(`updated  role w/ id=${role.id}`)),
      catchError(this.handleError<any>('updateRole'))
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
