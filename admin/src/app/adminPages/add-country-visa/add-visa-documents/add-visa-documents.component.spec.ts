import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisaDocumentsComponent } from './add-visa-documents.component';

describe('AddVisaDocumentsComponent', () => {
  let component: AddVisaDocumentsComponent;
  let fixture: ComponentFixture<AddVisaDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVisaDocumentsComponent]
    });
    fixture = TestBed.createComponent(AddVisaDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
