import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsMgmtComponent } from './instructors-mgmt.component';

describe('InstructorsMgmtComponent', () => {
  let component: InstructorsMgmtComponent;
  let fixture: ComponentFixture<InstructorsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
