import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsScheduleComponent } from './doctors-schedule.component';

describe('DoctorsScheduleComponent', () => {
  let component: DoctorsScheduleComponent;
  let fixture: ComponentFixture<DoctorsScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsScheduleComponent]
    });
    fixture = TestBed.createComponent(DoctorsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
