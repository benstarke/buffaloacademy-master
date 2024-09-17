import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningstepsInfoComponent } from './learningsteps-info.component';

describe('LearningstepsInfoComponent', () => {
  let component: LearningstepsInfoComponent;
  let fixture: ComponentFixture<LearningstepsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningstepsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningstepsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
