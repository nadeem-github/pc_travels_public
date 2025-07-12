import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPackagesHomeComponent } from './land-packages-home.component';

describe('LandPackagesHomeComponent', () => {
  let component: LandPackagesHomeComponent;
  let fixture: ComponentFixture<LandPackagesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandPackagesHomeComponent]
    });
    fixture = TestBed.createComponent(LandPackagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
