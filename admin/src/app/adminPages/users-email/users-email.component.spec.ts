import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEmailComponent } from './users-email.component';

describe('UsersEmailComponent', () => {
  let component: UsersEmailComponent;
  let fixture: ComponentFixture<UsersEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersEmailComponent]
    });
    fixture = TestBed.createComponent(UsersEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
