import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajjPackagesHomeComponent } from './hajj-packages-home.component';

describe('HajjPackagesHomeComponent', () => {
  let component: HajjPackagesHomeComponent;
  let fixture: ComponentFixture<HajjPackagesHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HajjPackagesHomeComponent]
    });
    fixture = TestBed.createComponent(HajjPackagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
