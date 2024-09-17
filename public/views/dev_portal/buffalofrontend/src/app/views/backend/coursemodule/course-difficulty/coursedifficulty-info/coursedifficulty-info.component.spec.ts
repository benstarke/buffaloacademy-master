import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedifficultyInfoComponent } from './coursedifficulty-info.component';

describe('CoursedifficultyInfoComponent', () => {
  let component: CoursedifficultyInfoComponent;
  let fixture: ComponentFixture<CoursedifficultyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursedifficultyInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursedifficultyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
