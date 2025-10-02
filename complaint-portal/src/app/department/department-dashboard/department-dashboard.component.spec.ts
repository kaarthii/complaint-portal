import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDashboard } from './department-dashboard.component';

describe('DepartmentDashboard', () => {
  let component: DepartmentDashboard;
  let fixture: ComponentFixture<DepartmentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
