import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailViewComponent } from './package-detail-view.component';

describe('PackageDetailViewComponent', () => {
  let component: PackageDetailViewComponent;
  let fixture: ComponentFixture<PackageDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageDetailViewComponent]
    });
    fixture = TestBed.createComponent(PackageDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
