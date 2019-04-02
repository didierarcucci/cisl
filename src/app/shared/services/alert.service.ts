import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  /*private alert:any;
  private alerts = new BehaviorSubject(this.alert);
  currentAlert = this.alerts.asObservable();

  constructor() { }

  add(_type, _msg): void {
    this.alerts.next({
      type: _type,
      msg: _msg
    });*/

  public alerts:any[] = [];

  add(_type, _msg): void {
    this.alerts.push({
      type: _type,
      msg: _msg
    });
  }

  dismiss(_alert: any): void {
    console.log('dismissing alert: ' + _alert);
    this.alerts = this.alerts.filter(alert => alert !== _alert);
  }

}