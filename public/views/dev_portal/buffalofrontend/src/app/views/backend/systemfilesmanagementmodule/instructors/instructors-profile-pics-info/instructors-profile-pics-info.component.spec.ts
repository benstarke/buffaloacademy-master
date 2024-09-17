import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsProfilePicsInfoComponent } from './instructors-profile-pics-info.component';

describe('InstructorsProfilePicsInfoComponent', () => {
  let component: InstructorsProfilePicsInfoComponent;
  let fixture: ComponentFixture<InstructorsProfilePicsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsProfilePicsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorsProfilePicsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
