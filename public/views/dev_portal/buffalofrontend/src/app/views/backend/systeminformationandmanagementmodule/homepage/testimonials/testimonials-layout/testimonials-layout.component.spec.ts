import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsLayoutComponent } from './testimonials-layout.component';

describe('TestimonialsLayoutComponent', () => {
  let component: TestimonialsLayoutComponent;
  let fixture: ComponentFixture<TestimonialsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
