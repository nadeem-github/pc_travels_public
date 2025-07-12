import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesHomeComponent } from './packages-home.component';

describe('PackagesHomeComponent', () => {
  let component: PackagesHomeComponent;
  let fixture: ComponentFixture<PackagesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagesHomeComponent]
    });
    fixture = TestBed.createComponent(PackagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
