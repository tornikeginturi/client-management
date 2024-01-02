import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountFormComponent } from './add-account-form.component';

describe('AddAccountFormComponent', () => {
  let component: AddAccountFormComponent;
  let fixture: ComponentFixture<AddAccountFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountFormComponent]
    });
    fixture = TestBed.createComponent(AddAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
