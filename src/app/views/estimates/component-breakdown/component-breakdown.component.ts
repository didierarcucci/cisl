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

  @Input() breakdown: ComponentBreakdown[];

  projectPhases: any[];

  doInit: boolean = false;

  breakdownForm: FormGroup;

  constructor(private fb: FormBuilder, private _lkpSvc: LookupService, private _estSvc: EstimateService) { }

  ngOnInit() { 
    console.log('***** ngOnInit *****');
    this.breakdownForm = this.fb.group({
      breakdown: this.fb.array([])
    });
    this.setProjectPhases();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('***** ngOnChanges ***** ');
    // ignore the first change... the component object is empty
    // below only fires once when the component is initialized
    if(this.doInit) {
      console.log('***** ngOnChanges doInit *****');
      this.fillUpBreakdownForm();
      this.doInit = false;
    }

    if(changes['breakdown'].isFirstChange())
      this.doInit = true;
  }

  fillUpBreakdownForm() {
    console.log('**** fillUpBreakdownForm *****');

    this.breakdown.forEach( b => {
      (this.breakdownForm.controls.breakdown as FormArray).push(this.fb.group({
        id: b.id,
        componentId: b.componentId,
        phaseId: b.phaseId,
        hours: b.hours,
        createdAd: b.createdAt,
        updatedAt: b.updatedAt,
        phase: b.phase
      }))
    });
  }

  setProjectPhases() {
    this.projectPhases = [];
    this._lkpSvc.getLookupByCode('projectphases').subscribe((data) => {
      this.projectPhases = data.lookupValues;
    });
  }

  getEffortHours(_phaseId) {
    let phase = this.breakdown.filter(
      function (data) { return data.phaseId == _phaseId }
    );

    if (phase === undefined)
      return 0;
    else
      return phase[0].hours;
  }

  onSubmit() {
    console.log('***** ComponentBreakdown OnSubmit *****');
    //console.warn(this.breakdown);
    //console.warn(this.breakdownForm.value.breakdown);
    this.breakdown = this.breakdownForm.value.breakdown;
    //console.warn(this.breakdown);
  }

}