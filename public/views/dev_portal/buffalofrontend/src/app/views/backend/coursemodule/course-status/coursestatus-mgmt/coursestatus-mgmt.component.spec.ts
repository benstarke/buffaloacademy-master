import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursestatusMgmtComponent } from './coursestatus-mgmt.component';

describe('CoursestatusMgmtComponent', () => {
  let component: CoursestatusMgmtComponent;
  let fixture: ComponentFixture<CoursestatusMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursestatusMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursestatusMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
