import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorsListViewComponent } from './admin-doctors-list-view.component';

describe('AdminDoctorsListViewComponent', () => {
  let component: AdminDoctorsListViewComponent;
  let fixture: ComponentFixture<AdminDoctorsListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDoctorsListViewComponent]
    });
    fixture = TestBed.createComponent(AdminDoctorsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
