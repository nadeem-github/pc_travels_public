import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAgentModalComponent } from './add-new-agent-modal.component';

describe('AddNewAgentModalComponent', () => {
  let component: AddNewAgentModalComponent;
  let fixture: ComponentFixture<AddNewAgentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewAgentModalComponent]
    });
    fixture = TestBed.createComponent(AddNewAgentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
