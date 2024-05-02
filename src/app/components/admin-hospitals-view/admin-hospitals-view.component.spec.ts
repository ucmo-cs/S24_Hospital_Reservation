import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalsViewComponent } from './admin-hospitals-view.component';

describe('AdminHospitalsViewComponent', () => {
  let component: AdminHospitalsViewComponent;
  let fixture: ComponentFixture<AdminHospitalsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHospitalsViewComponent]
    });
    fixture = TestBed.createComponent(AdminHospitalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
