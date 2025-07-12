import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAvailableBlockModalComponent } from './add-new-available-block-modal.component';

describe('AddNewAvailableBlockModalComponent', () => {
  let component: AddNewAvailableBlockModalComponent;
  let fixture: ComponentFixture<AddNewAvailableBlockModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewAvailableBlockModalComponent]
    });
    fixture = TestBed.createComponent(AddNewAvailableBlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
