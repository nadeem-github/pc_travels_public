import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailHomeComponent } from './flight-detail-home.component';

describe('FlightDetailHomeComponent', () => {
  let component: FlightDetailHomeComponent;
  let fixture: ComponentFixture<FlightDetailHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightDetailHomeComponent]
    });
    fixture = TestBed.createComponent(FlightDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
