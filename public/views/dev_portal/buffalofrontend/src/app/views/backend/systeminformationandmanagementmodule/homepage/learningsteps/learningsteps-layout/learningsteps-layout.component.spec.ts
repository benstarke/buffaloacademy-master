import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningstepsLayoutComponent } from './learningsteps-layout.component';

describe('LearningstepsLayoutComponent', () => {
  let component: LearningstepsLayoutComponent;
  let fixture: ComponentFixture<LearningstepsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningstepsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningstepsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
