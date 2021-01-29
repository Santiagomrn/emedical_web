import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentDoctorComponent } from './list-appointment-doctor.component';

describe('ListAppointmentDoctorComponent', () => {
  let component: ListAppointmentDoctorComponent;
  let fixture: ComponentFixture<ListAppointmentDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
