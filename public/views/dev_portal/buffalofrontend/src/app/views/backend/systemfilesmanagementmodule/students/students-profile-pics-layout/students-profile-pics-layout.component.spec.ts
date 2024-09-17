import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsProfilePicsLayoutComponent } from './students-profile-pics-layout.component';

describe('StudentsProfilePicsLayoutComponent', () => {
  let component: StudentsProfilePicsLayoutComponent;
  let fixture: ComponentFixture<StudentsProfilePicsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsProfilePicsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsProfilePicsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
