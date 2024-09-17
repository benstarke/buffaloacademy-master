import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedifficultyLayoutComponent } from './coursedifficulty-layout.component';

describe('CoursedifficultyLayoutComponent', () => {
  let component: CoursedifficultyLayoutComponent;
  let fixture: ComponentFixture<CoursedifficultyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursedifficultyLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursedifficultyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
