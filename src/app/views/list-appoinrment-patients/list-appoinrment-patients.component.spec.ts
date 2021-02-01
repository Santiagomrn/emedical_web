import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppoinrmentPatientsComponent } from './list-appoinrment-patients.component';

describe('ListAppoinrmentPatientsComponent', () => {
  let component: ListAppoinrmentPatientsComponent;
  let fixture: ComponentFixture<ListAppoinrmentPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppoinrmentPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppoinrmentPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
