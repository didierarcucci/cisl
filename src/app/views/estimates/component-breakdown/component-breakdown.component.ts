import { Component, OnInit, Input, OnChanges, SimpleChanges, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { EstimateComponent } from '../../../shared/classes/estimatecomponent';
import { ComponentBreakdown } from '../../../shared/classes/componentBreakdown';
import { LookupService } from '../../../shared/services/lookup.service';
import { EstimateService } from '../../../shared/services/estimate.service';

import { from } from 'rxjs';

@Component({
  selector: 'app-component-breakdown',
  templateUrl: './component-breakdown.component.html',
  styleUrls: ['./component-breakdown.component.scss']
})
export class ComponentBreakdownComponent implements OnInit {

  @Input() component: EstimateComponent;

  componentBreakdown: ComponentBreakdown[];

  projectPhases: any[];

  doInit: boolean = false;

  breakdownForm: FormGroup;

  constructor(private fb: FormBuilder, private _lkpSvc: LookupService, private _estSvc: EstimateService) { }

  ngOnInit() { 
    console.log('***** ngOnInit *****');
  }

  ngOnChanges(changes: SimpleChanges) {
    // ignore the first change... the component object is empty
    // below only fires once when the component is initialized
    if(this.doInit) {
      console.log('***** ngOnChange doInit *****');
      //this.getProjectPhases();

      console.log('***** set componentBreakdown *****');
      this.componentBreakdown = this.component.breakdown;
      console.log(this.componentBreakdown);

      this.breakdownForm = this.fb.group({
        phases: this.fb.array([ this.createBreakdown(this.component.breakdown) ])
      });

      this.doInit = false;
    }

    if(changes['component'].isFirstChange())
      this.doInit = true;
  }

  createBreakdown(_cpBreakdown): FormGroup {
    
  }

  getProjectPhases() {
    console.log('***** getProjectPhases *****');
    this.projectPhases = [];
    this._lkpSvc.getLookupByCode('projectphases').subscribe((data) => {
      this.projectPhases = data.lookupValues;
      console.log(this.projectPhases);
    })
  }

  getPhaseName(_phaseId) {
    console.log('***** getPhaseName ***** ' + _phaseId);
    return this.projectPhases.filter(
      function(data) { return data.id == _phaseId }
    )
  }

}