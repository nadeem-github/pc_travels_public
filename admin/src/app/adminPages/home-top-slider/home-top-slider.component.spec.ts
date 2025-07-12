import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopSliderComponent } from './home-top-slider.component';

describe('HomeTopSliderComponent', () => {
  let component: HomeTopSliderComponent;
  let fixture: ComponentFixture<HomeTopSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTopSliderComponent]
    });
    fixture = TestBed.createComponent(HomeTopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
