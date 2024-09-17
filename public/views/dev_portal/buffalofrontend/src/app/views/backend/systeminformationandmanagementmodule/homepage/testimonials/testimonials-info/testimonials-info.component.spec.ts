import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsInfoComponent } from './testimonials-info.component';

describe('TestimonialsInfoComponent', () => {
  let component: TestimonialsInfoComponent;
  let fixture: ComponentFixture<TestimonialsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
