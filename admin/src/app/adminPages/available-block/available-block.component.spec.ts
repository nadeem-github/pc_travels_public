import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBlockComponent } from './available-block.component';

describe('AvailableBlockComponent', () => {
  let component: AvailableBlockComponent;
  let fixture: ComponentFixture<AvailableBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableBlockComponent]
    });
    fixture = TestBed.createComponent(AvailableBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
