import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsMgmtComponent } from './testimonials-mgmt.component';

describe('TestimonialsMgmtComponent', () => {
  let component: TestimonialsMgmtComponent;
  let fixture: ComponentFixture<TestimonialsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonialsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
