import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxHomeComponent } from './parallax-home.component';

describe('ParallaxHomeComponent', () => {
  let component: ParallaxHomeComponent;
  let fixture: ComponentFixture<ParallaxHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParallaxHomeComponent]
    });
    fixture = TestBed.createComponent(ParallaxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
