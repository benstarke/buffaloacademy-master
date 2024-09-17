import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsProfilePicsInfoComponent } from './students-profile-pics-info.component';

describe('StudentsProfilePicsInfoComponent', () => {
  let component: StudentsProfilePicsInfoComponent;
  let fixture: ComponentFixture<StudentsProfilePicsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsProfilePicsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsProfilePicsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
