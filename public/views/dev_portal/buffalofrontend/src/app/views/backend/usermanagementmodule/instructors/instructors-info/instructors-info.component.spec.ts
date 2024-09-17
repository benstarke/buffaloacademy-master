import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsInfoComponent } from './instructors-info.component';

describe('InstructorsInfoComponent', () => {
  let component: InstructorsInfoComponent;
  let fixture: ComponentFixture<InstructorsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
