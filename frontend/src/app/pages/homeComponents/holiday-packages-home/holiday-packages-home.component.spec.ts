import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPackagesHomeComponent } from './holiday-packages-home.component';

describe('HolidayPackagesHomeComponent', () => {
  let component: HolidayPackagesHomeComponent;
  let fixture: ComponentFixture<HolidayPackagesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayPackagesHomeComponent]
    });
    fixture = TestBed.createComponent(HolidayPackagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
