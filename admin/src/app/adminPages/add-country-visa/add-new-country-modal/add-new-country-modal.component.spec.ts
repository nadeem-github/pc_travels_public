import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCountryModalComponent } from './add-new-country-modal.component';

describe('AddNewCountryModalComponent', () => {
  let component: AddNewCountryModalComponent;
  let fixture: ComponentFixture<AddNewCountryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCountryModalComponent]
    });
    fixture = TestBed.createComponent(AddNewCountryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
