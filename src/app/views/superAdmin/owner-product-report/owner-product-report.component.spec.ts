import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProductReportComponent } from './owner-product-report.component';

describe('OwnerProductReportComponent', () => {
  let component: OwnerProductReportComponent;
  let fixture: ComponentFixture<OwnerProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
