import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePatientsDoctorComponent } from './profile-patients-doctor.component';

describe('ProfilePatientsDoctorComponent', () => {
  let component: ProfilePatientsDoctorComponent;
  let fixture: ComponentFixture<ProfilePatientsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePatientsDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePatientsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
