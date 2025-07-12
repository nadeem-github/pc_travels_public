import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsAddModalComponent } from './about-us-add-modal.component';

describe('AboutUsAddModalComponent', () => {
  let component: AboutUsAddModalComponent;
  let fixture: ComponentFixture<AboutUsAddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsAddModalComponent]
    });
    fixture = TestBed.createComponent(AboutUsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
