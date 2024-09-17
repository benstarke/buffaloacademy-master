import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedifficultyMgmtComponent } from './coursedifficulty-mgmt.component';

describe('CoursedifficultyMgmtComponent', () => {
  let component: CoursedifficultyMgmtComponent;
  let fixture: ComponentFixture<CoursedifficultyMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursedifficultyMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursedifficultyMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
