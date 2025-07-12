import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryVisaComponent } from './add-country-visa.component';

describe('AddCountryVisaComponent', () => {
  let component: AddCountryVisaComponent;
  let fixture: ComponentFixture<AddCountryVisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCountryVisaComponent]
    });
    fixture = TestBed.createComponent(AddCountryVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
