import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonOwnerComponent } from './salon-owner.component';

describe('SalonOwnerComponent', () => {
  let component: SalonOwnerComponent;
  let fixture: ComponentFixture<SalonOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
