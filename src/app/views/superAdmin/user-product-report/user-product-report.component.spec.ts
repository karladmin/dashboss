import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductReportComponent } from './user-product-report.component';

describe('UserProductReportComponent', () => {
  let component: UserProductReportComponent;
  let fixture: ComponentFixture<UserProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
