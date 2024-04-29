import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsPrescriptionComponent } from './doctors-prescription.component';

describe('DoctorsPrescriptionComponent', () => {
  let component: DoctorsPrescriptionComponent;
  let fixture: ComponentFixture<DoctorsPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsPrescriptionComponent]
    });
    fixture = TestBed.createComponent(DoctorsPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
