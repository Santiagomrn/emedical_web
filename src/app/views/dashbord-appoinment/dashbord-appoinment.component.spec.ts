import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAppoinmentComponent } from './dashbord-appoinment.component';

describe('DashbordAppoinmentComponent', () => {
  let component: DashbordAppoinmentComponent;
  let fixture: ComponentFixture<DashbordAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordAppoinmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
