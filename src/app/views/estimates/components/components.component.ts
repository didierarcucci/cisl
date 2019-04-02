import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { EstimateService } from '../../../shared/services/estimate.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  @Input('components') components: any[];
  @Input('estimateId') estimateId: any;

  public config: PaginationInstance = {
    id: 'components',
    itemsPerPage: 5,
    currentPage: 1
  };

  constructor( private _estSvc: EstimateService,
               private route: ActivatedRoute,
               private router: Router,
               private _alertSvc:AlertService) { }

  ngOnInit() {
  }

}
