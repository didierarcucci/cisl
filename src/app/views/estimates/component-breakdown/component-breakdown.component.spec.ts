import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBreakdownComponent } from './component-breakdown.component';

describe('ComponentBreakdownComponent', () => {
  let component: ComponentBreakdownComponent;
  let fixture: ComponentFixture<ComponentBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
