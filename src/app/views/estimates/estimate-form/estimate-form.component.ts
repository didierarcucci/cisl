import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Estimate } from '../../../shared/classes/estimate';
import { EstimateService } from '../../../shared/services/estimate.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-estimate-form',
  templateUrl: './estimate-form.component.html',
  styleUrls: ['./estimate-form.component.scss']
})
export class EstimateFormComponent implements OnInit {

  estimate = new Estimate();
  estimateId:any;

  actionType:any;
  submitted = false;

  public config: PaginationInstance = {
    id: 'components',
    itemsPerPage: 5,
    currentPage: 1
  };

  constructor(private _estSvc: EstimateService, private route: ActivatedRoute, private router: Router, private _alertService:AlertService) {
    this.estimateId = this.route.snapshot.params['id'];

         if (this.router.url.includes('clone')) this.actionType = 'clone';
    else if (this.router.url.includes('edit'))  this.actionType = 'edit';
    else if (this.router.url.includes('new'))   this.actionType = 'new';
    else                                        this.actionType = 'unknown';

    if (this.actionType == 'clone' || this.actionType == 'edit') this.getEstimateDetails();
  }
   
  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    console.log(JSON.stringify(this.estimate));
    if (this.actionType == 'edit') this.updateEstimate()
    else this.addEstimate();
  }

  getEstimateDetails() {
    console.log('get estimate details');
    this._estSvc.getById(this.estimateId).subscribe((data: Estimate) => {
      this.estimate = data;
      if (this.actionType == 'clone') {
        this.estimate.id = null;
        this.estimate.name = this.estimate.name + ' (cloned)';
        this.estimate.version = +this.estimate.version + 1;
      }
    });
  }

  addEstimate() {
    console.log('add estimate');
    this._estSvc.addEstimate(this.estimate).subscribe((result) => {
      this._alertService.add('success', 'This estimate has been added.');
      this.router.navigate(['estimates']);
    }, (err) => {
      this._alertService.add('error', 'Seems like an error occurred while adding this estimate.');
      console.log(err);
    });
  }

  updateEstimate() {
    console.log('update estimate: '+ JSON.stringify(this.estimate));
    this._estSvc.updateEstimate(this.estimate).subscribe((result) => {
      this._alertService.add('success', 'This estimate has been updated.');
      this.router.navigate(['estimates']);
    }, (err) => {
      this._alertService.add('error', 'Seems like an error occurred while updating this estimate.');
      console.log(err);
    });
  }

  deleteComponent(_componentId) {
    console.log('delete component: '+ _componentId);
    this._estSvc.deleteComponent(_componentId).subscribe((result) => {
      console.log("component deleted");
      this._alertService.add('success', 'Component deleted successfully!');
      this.router.navigate(['/estimates/estimate-edit', this.estimateId]);
    }, (err) => {
      this._alertService.add('error', 'An error was encountered while deleting the component.');
      console.log(err);
    });
  }

}
