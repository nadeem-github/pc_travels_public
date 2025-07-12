import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranportHomeComponent } from './tranport-home.component';

describe('TranportHomeComponent', () => {
  let component: TranportHomeComponent;
  let fixture: ComponentFixture<TranportHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranportHomeComponent]
    });
    fixture = TestBed.createComponent(TranportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
