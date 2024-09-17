import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffaloLearningStepsComponent } from './buffalo-learning-steps.component';

describe('BuffaloLearningStepsComponent', () => {
  let component: BuffaloLearningStepsComponent;
  let fixture: ComponentFixture<BuffaloLearningStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffaloLearningStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuffaloLearningStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
