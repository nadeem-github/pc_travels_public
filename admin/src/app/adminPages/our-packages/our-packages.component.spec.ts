import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPackagesComponent } from './our-packages.component';

describe('OurPackagesComponent', () => {
  let component: OurPackagesComponent;
  let fixture: ComponentFixture<OurPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurPackagesComponent]
    });
    fixture = TestBed.createComponent(OurPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
