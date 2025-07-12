import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationDetailsComponent } from './transportation-details.component';

describe('TransportationDetailsComponent', () => {
  let component: TransportationDetailsComponent;
  let fixture: ComponentFixture<TransportationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportationDetailsComponent]
    });
    fixture = TestBed.createComponent(TransportationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
