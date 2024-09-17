import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMgmtComponent } from './courses-mgmt.component';

describe('CoursesMgmtComponent', () => {
  let component: CoursesMgmtComponent;
  let fixture: ComponentFixture<CoursesMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
