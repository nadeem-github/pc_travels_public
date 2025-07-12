import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsHomeComponent } from './hotels-home.component';

describe('HotelsHomeComponent', () => {
  let component: HotelsHomeComponent;
  let fixture: ComponentFixture<HotelsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelsHomeComponent]
    });
    fixture = TestBed.createComponent(HotelsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
