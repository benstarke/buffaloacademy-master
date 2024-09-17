import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsProfilePicsLayoutComponent } from './instructors-profile-pics-layout.component';

describe('InstructorsProfilePicsLayoutComponent', () => {
  let component: InstructorsProfilePicsLayoutComponent;
  let fixture: ComponentFixture<InstructorsProfilePicsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsProfilePicsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorsProfilePicsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
