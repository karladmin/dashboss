import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCodeComponent } from './subscription-code.component';

describe('SubscriptionCodeComponent', () => {
  let component: SubscriptionCodeComponent;
  let fixture: ComponentFixture<SubscriptionCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
