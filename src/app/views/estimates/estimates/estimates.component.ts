import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { EstimateService } from '../../../shared/services/estimate.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.scss']
})
export class EstimatesComponent implements OnInit {

  estimates: any = [];

  public config: PaginationInstance = {
    id: 'estimates',
    itemsPerPage: 5,
    currentPage: 1
  };

  page: number = 1;

  constructor(private _estimateSvc: EstimateService, private _alertService: AlertService) {}

  ngOnInit() {
    this.getEstimates();
  }

  getEstimates() {
    console.log('enter get estimates');
    this.estimates = [];
    this._estimateSvc.getEstimates().subscribe((data: {}) => {
      console.log(data);
      this.estimates = data;
    });
  }

}
