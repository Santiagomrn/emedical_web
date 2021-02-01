import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDoctorsPatientComponent } from './profile-doctors-patient.component';

describe('ProfileDoctorsPatientComponent', () => {
  let component: ProfileDoctorsPatientComponent;
  let fixture: ComponentFixture<ProfileDoctorsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDoctorsPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDoctorsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
