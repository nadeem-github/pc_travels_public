import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHomeAddModalComponent } from './block-home-add-modal.component';

describe('BlockHomeAddModalComponent', () => {
  let component: BlockHomeAddModalComponent;
  let fixture: ComponentFixture<BlockHomeAddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockHomeAddModalComponent]
    });
    fixture = TestBed.createComponent(BlockHomeAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
