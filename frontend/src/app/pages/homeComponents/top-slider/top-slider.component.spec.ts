import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSliderComponent } from './top-slider.component';

describe('TopSliderComponent', () => {
  let component: TopSliderComponent;
  let fixture: ComponentFixture<TopSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopSliderComponent]
    });
    fixture = TestBed.createComponent(TopSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
