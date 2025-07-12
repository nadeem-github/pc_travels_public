import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryVisaModalComponent } from './add-country-visa-modal.component';

describe('AddCountryVisaModalComponent', () => {
  let component: AddCountryVisaModalComponent;
  let fixture: ComponentFixture<AddCountryVisaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCountryVisaModalComponent]
    });
    fixture = TestBed.createComponent(AddCountryVisaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
