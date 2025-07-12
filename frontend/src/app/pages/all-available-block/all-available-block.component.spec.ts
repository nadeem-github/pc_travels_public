import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAvailableBlockComponent } from './all-available-block.component';

describe('AllAvailableBlockComponent', () => {
  let component: AllAvailableBlockComponent;
  let fixture: ComponentFixture<AllAvailableBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAvailableBlockComponent]
    });
    fixture = TestBed.createComponent(AllAvailableBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
