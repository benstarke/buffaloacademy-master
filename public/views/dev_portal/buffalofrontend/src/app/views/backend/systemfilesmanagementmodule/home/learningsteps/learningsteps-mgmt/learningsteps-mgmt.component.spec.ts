import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningstepsMgmtComponent } from './learningsteps-mgmt.component';

describe('LearningstepsMgmtComponent', () => {
  let component: LearningstepsMgmtComponent;
  let fixture: ComponentFixture<LearningstepsMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningstepsMgmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningstepsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
