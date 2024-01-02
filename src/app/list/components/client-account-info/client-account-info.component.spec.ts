import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountInfoComponent } from './client-account-info.component';

describe('ClientAccountInfoComponent', () => {
  let component: ClientAccountInfoComponent;
  let fixture: ComponentFixture<ClientAccountInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAccountInfoComponent]
    });
    fixture = TestBed.createComponent(ClientAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
