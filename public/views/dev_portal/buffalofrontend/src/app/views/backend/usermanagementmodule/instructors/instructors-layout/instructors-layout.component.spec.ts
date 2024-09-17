import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsLayoutComponent } from './instructors-layout.component';

describe('InstructorsLayoutComponent', () => {
  let component: InstructorsLayoutComponent;
  let fixture: ComponentFixture<InstructorsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
