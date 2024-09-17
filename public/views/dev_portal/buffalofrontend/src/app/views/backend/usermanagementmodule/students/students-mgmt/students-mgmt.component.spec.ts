import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsMgmtComponent } from './students-mgmt.component';

describe('StudentsMgmtComponent', () => {
  let component: StudentsMgmtComponent;
  let fixture: ComponentFixture<StudentsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
