import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { EstimateService } from '../../../shared/services/estimate.service';

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

  constructor(private _estimateSvc: EstimateService) { }

  ngOnInit() {
    this.getEstimates();
  }

  getEstimates() {
    this.estimates = [];
    this._estimateSvc.getEstimates().subscribe((data: {}) => {
      console.log(data);
      this.estimates = data;
    });
  }

}
