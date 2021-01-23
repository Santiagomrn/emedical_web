import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePatientsComponent } from './home-patients.component';

describe('HomePatientsComponent', () => {
  let component: HomePatientsComponent;
  let fixture: ComponentFixture<HomePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
