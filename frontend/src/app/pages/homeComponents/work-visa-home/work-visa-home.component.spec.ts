import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkVisaHomeComponent } from './work-visa-home.component';

describe('WorkVisaHomeComponent', () => {
  let component: WorkVisaHomeComponent;
  let fixture: ComponentFixture<WorkVisaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkVisaHomeComponent]
    });
    fixture = TestBed.createComponent(WorkVisaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
