import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffaloTestimonialsComponent } from './buffalo-testimonials.component';

describe('BuffaloTestimonialsComponent', () => {
  let component: BuffaloTestimonialsComponent;
  let fixture: ComponentFixture<BuffaloTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffaloTestimonialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuffaloTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
